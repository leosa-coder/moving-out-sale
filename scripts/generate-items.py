#!/usr/bin/env python3
import json
import re
import sys
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

WORKBOOK = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    "/Users/leosapenus/Projects/MovingOutSale/Moving out sale.xlsx"
)
OUTPUT = Path("src/items.ts")
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def read_xml(archive: zipfile.ZipFile, name: str) -> ET.Element:
    return ET.fromstring(archive.read(name))


def column_index(cell_ref: str) -> int:
    letters = re.sub(r"[^A-Z]", "", cell_ref.upper())
    index = 0
    for letter in letters:
        index = index * 26 + ord(letter) - ord("A") + 1
    return index - 1


def shared_strings(archive: zipfile.ZipFile) -> list[str]:
    try:
        root = read_xml(archive, "xl/sharedStrings.xml")
    except KeyError:
        return []

    values: list[str] = []
    for item in root.findall("x:si", NS):
        parts = [node.text or "" for node in item.findall(".//x:t", NS)]
        values.append("".join(parts))
    return values


def cell_value(cell: ET.Element, strings: list[str]):
    value_node = cell.find("x:v", NS)
    cell_type = cell.attrib.get("t")

    if cell_type == "inlineStr":
        text_node = cell.find(".//x:t", NS)
        return text_node.text if text_node is not None else None

    if value_node is None or value_node.text is None:
        return None

    raw = value_node.text
    if cell_type == "s":
        return strings[int(raw)]

    try:
        number = float(raw)
    except ValueError:
        return raw

    return int(number) if number.is_integer() else number


def sheet_rows(archive: zipfile.ZipFile) -> list[list[Any]]:
    strings = shared_strings(archive)
    root = read_xml(archive, "xl/worksheets/sheet1.xml")
    rows: list[list[object | None]] = []

    for row in root.findall(".//x:sheetData/x:row", NS):
        values: list[Any] = []
        for cell in row.findall("x:c", NS):
            index = column_index(cell.attrib["r"])
            while len(values) <= index:
                values.append(None)
            values[index] = cell_value(cell, strings)
        rows.append(values)

    return rows


with zipfile.ZipFile(WORKBOOK) as archive:
    rows = sheet_rows(archive)

headers = [str(value) for value in rows[0]]
records = []
for row in rows[1:]:
    record = {
        header: row[index] if index < len(row) else None
        for index, header in enumerate(headers)
    }
    if any(value is not None for value in record.values()):
        records.append(record)

source = f'''import {{ normalizeRows, type RawRow }} from "./catalog";

export const rawRows = {json.dumps(records, ensure_ascii=False, indent=2)} satisfies RawRow[];

export const items = normalizeRows(rawRows);

export const categories = Array.from(new Set(items.map((item) => item.category)));
'''

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(source)
print(f"Wrote {len(records)} source rows to {OUTPUT.resolve()}")
