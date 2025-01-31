from flask import Flask, render_template, request, send_file
import os
import pandas as pd
import uuid
import re

app = Flask(__name__)

# Configure upload and processed folders
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def sanitize_filename(name):
    """Clean and format the custom filename"""
    # Remove invalid characters
    cleaned = re.sub(r'[^a-zA-Z0-9_\-\s]', '', name.strip())
    # Replace spaces with underscores
    cleaned = re.sub(r'\s+', '_', cleaned)
    # Truncate if too long
    return cleaned[:50] or 'processed_data'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the uploaded file and custom filename
        file = request.files['file']
        custom_name = request.form.get('filename', 'processed_data')
        
        if file and file.filename.endswith('.csv'):
            # Sanitize the custom filename
            safe_name = sanitize_filename(custom_name)
            
            # Save the uploaded file
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)

            # Process the file and get DataFrame
            merged_df = process_file(file_path)

            # Generate unique output filename
            unique_id = uuid.uuid4().hex[:8]
            output_filename = f"temp_{unique_id}.csv"
            output_path = os.path.join(app.config['PROCESSED_FOLDER'], output_filename)
            
            # Save processed data with temporary name
            merged_df.to_csv(output_path, index=False)

            # Send file with custom name
            return send_file(
                output_path,
                as_attachment=True,
                download_name=f"{safe_name}.csv",
                mimetype='text/csv'
            )

    return render_template('index.html')

def process_file(input_path):
    # Read and process the input file
    data = pd.read_csv(input_path)
    data['DATE_OF_TRAN'] = pd.to_datetime(data['DATE_OF_TRAN'])
    categories = data['RPTCODE'].unique()
    
    final_dfs = {}
    
    for category in categories:
        filtered_data = data[data['RPTCODE'] == category]
        total_amounts = filtered_data.groupby('DATE_OF_TRAN', as_index=False)['TRAN_AMT'].sum()

        # Add missing columns
        for col in ['SR', 'TRANID', 'ACCOUNT NUMBER', 'DR/CR', 'RPTCODE', 'ACCOUNT NAME']:
            total_amounts[col] = None

        # Mark total rows
        total_amounts['Total'] = 'Total'
        filtered_data['Total'] = ''

        # Combine data
        df_final = pd.concat([filtered_data, total_amounts]).sort_values(by=['DATE_OF_TRAN', 'Total'])
        df_final = df_final.drop(columns=['Total']).reset_index(drop=True)
        
        final_dfs[category] = df_final

    return pd.concat(list(final_dfs.values()), ignore_index=True)

if __name__ == '__main__':
    app.run(debug=True)