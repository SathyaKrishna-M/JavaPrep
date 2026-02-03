import pdfplumber

pdf_path = r'd:\5Projects\BBHub-Clone\JavaPrep\tmp\compile\RefFiles\FWD QB.pdf'
output_path = r'd:\5Projects\BBHub-Clone\JavaPrep\extracted_questions.txt'

try:
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text() + "\n\n--- PAGE BREAK ---\n\n"
            
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(full_text)
        
    print(f"Successfully extracted text to {output_path}")

except Exception as e:
    print(f"Error extracting PDF: {e}")
