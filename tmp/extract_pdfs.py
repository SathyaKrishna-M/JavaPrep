
import os
from pypdf import PdfReader

pdf_dir = r"d:\5Projects\BBHub-Clone\JavaPrep\tmp\compile\RefFiles"
output_file = r"d:\5Projects\BBHub-Clone\JavaPrep\tmp\extracted_content.txt"

files = [
    "Session-1_7829 ALI.pdf",
    "Session-2.pdf",
    "Session-3-1.pdf",
    "Session-4 and 5.pdf",
    "HA-1.pdf",
    "Home Assignment-2.pdf"
]

with open(output_file, "w", encoding="utf-8") as out:
    for fname in files:
        fpath = os.path.join(pdf_dir, fname)
        if os.path.exists(fpath):
            try:
                reader = PdfReader(fpath)
                out.write(f"\n\n--- START OF {fname} ---\n\n")
                for page in reader.pages:
                    text = page.extract_text()
                    out.write(text)
                    out.write("\n")
                out.write(f"\n\n--- END OF {fname} ---\n\n")
                print(f"Processed {fname}")
            except Exception as e:
                out.write(f"\n\nERROR PROCESSING {fname}: {str(e)}\n\n")
                print(f"Error processing {fname}: {e}")
        else:
            print(f"File not found: {fpath}")

print("Done.")
