# **Automated Excel Processing with Flask**

## 🚀 Overview
This project began as a solution to a repetitive and time-consuming workflow in my father’s office. He used to manually sort, group, and sum Excel data daily — a task that took hours.

To streamline this, I developed a **Python-based processing script**, then built a **Flask web app** with a simple interface. Over time, it evolved into a **multi-feature Excel utility**, now including **file comparison**, **Excel formatting**, and **multiple downloads**.

---

## 🎯 Key Features
- ✅ Upload and process Excel (`.xlsx`) files instantly
- ✅ Automatically **sorts by date**, **groups by category**, and **adds total rows**
- ✅ Compare two Excel files based on matching account columns
- ✅ Highlight mismatched values and identify entries missing in one of the files
- ✅ Generates **three downloadable output files**:
  - `common.xlsx`: Common entries with mismatches
  - `only_in_d1.xlsx`: Entries only in File 1
  - `only_in_d2.xlsx`: Entries only in File 2
- ✅ Clean and minimal **Flask web interface**
- ✅ **Hosted on PythonAnywhere** for easy access from anywhere

---

## 🛠️ Tech Stack
- **Python** – Core logic and data handling
- **Flask** – Lightweight backend framework
- **Pandas** – Data cleaning and transformation
- **OpenPyXL** – Excel writing and styling
- **Render** – Deployment and hosting

---

## 📂 How It Works

### 🔧 File Processing
1. Upload an `.xlsx` Excel file
2. File is sorted by `DATE_OF_TRAN`
3. Grouped by `RPTCODE`, and sum of `TRAN_AMT` is calculated
4. A `Total` row is added after each group
5. Download the final, formatted Excel file

### 📊 File Comparison
1. Upload two Excel files (File 1 and File 2)
2. The system matches rows using the `A/c` column
3. Compares the `ST` values
4. Outputs:
   - `common.xlsx`: Matched but with differences
   - `only_in_d1.xlsx`: Records only found in File 1
   - `only_in_d2.xlsx`: Records only found in File 2
5. Output files are individually downloadable

---

## ⚠️ Challenges & Solutions

### 1. Handling Corrupt or Mixed Data Columns
- Some numeric columns included commas, dashes, or text
- ✔️ Solution: Implemented a `clean_numeric()` function using regex + `to_numeric` with fallback

### 2. Only One File Was Downloadable on Compare
- Initially, only `common.xlsx` was returned
- ✔️ Solution: Added additional `send_file()` routes and separate download buttons for each file

### 3. Poor Excel Readability
- Unstyled, cluttered Excel sheets were hard to interpret
- ✔️ Solution: Used `openpyxl` to apply formatting (bold headers, color fills, auto column width)

### 4. File Overwrites & Unsafe Names
- Simultaneous users could overwrite files
- ✔️ Solution: Used `uuid` to generate unique filenames and `re.sub()` for safe names

---

## 🌐 Live Demo
**🔗 [Clik Here to Launch Web App](https://editurxl.onrender.com/)**

---

## 📈 Future Enhancements
- Support for more file formats: `.csv`, `.tsv`, `.xls`
- Secure **login-based access**
- Add **drag-and-drop** upload area with instant previews
- User-selectable **comparison columns**
- Include **download logs or audit history**
- Add **email delivery** of outputs (for scheduled reports)

---

## 🤝 Contribution
Contributions are welcome!  
Fork the repo, suggest features, or raise issues — all feedback helps.

---

## 📜 License
This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more information.

---
