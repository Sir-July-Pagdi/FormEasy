FormEasy form templates
-----------------------
Each form is a pair of files with the same name:
  g11_academic.pdf / g11_academic.json
  g11_techpro.pdf  / g11_techpro.json
  g12_academic.pdf / g12_academic.json
  g12_techpro.pdf  / g12_techpro.json

The PDF is your official form (one landscape page: front on the left, back on the right).
The JSON lists where each blank field, table row and box sits on that PDF (points, measured from the top-left).

When FormEasy is opened from a web address (for example GitHub Pages), it loads these files from this folder,
so you can replace a PDF and its JSON without rebuilding the app. If the files are missing, or the page is opened
as a plain file, FormEasy uses the copies built into index.html.
If you change the form layout, the JSON must be regenerated to match; send me the new PDF and I will do it.
