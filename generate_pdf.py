import markdown
from fpdf import FPDF, HTMLMixin
import sys

# Read the markdown file
input_md = r"c:\Users\Windows\Documents\capstone\WATER-HALL_DART\iot_hardware_list.md"
output_pdf = r"c:\Users\Windows\Documents\capstone\WATER-HALL_DART\WATERHALL_IoT_Shopping_List.pdf"

class MyFPDF(FPDF, HTMLMixin):
    pass

try:
    with open(input_md, 'r', encoding='utf-8') as f:
        text = f.read().replace('Ω', ' Ohms')

    # Convert markdown to HTML
    html = markdown.markdown(text)
    
    # fpdf2's HTML parser is a bit strict, let's wrap it
    html = f"<font face='Helvetica'>{html}</font>"

    # Generate PDF
    pdf = MyFPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=11)
    
    pdf.write_html(html)
    pdf.output(output_pdf)
    print("PDF generated successfully at:", output_pdf)

except Exception as e:
    print("Error:", e)
    sys.exit(1)
