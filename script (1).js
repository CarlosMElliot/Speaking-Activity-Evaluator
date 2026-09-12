let selections = {};

function selectScore(rowIdx, scoreVal, levelName, cellElement) {
    let row = document.getElementById('row' + rowIdx);
    let criterionName = row.getAttribute('data-criterion');
    let descText = cellElement.querySelector('.desc') ? cellElement.querySelector('.desc').innerText.trim() : '';

    let cells = row.getElementsByClassName('level-cell');
    for (let cell of cells) {
        cell.classList.remove('selected');
    }
    cellElement.classList.add('selected');

    let radio = cellElement.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;

    document.getElementById('score' + rowIdx).value = scoreVal;
    selections[rowIdx] = {
        criterion: criterionName,
        level: levelName,
        score: scoreVal,
        description: descText
    };
    
    updateTotal();
}

function updateTotal() {
    let total = 0;
    for (let i = 1; i <= 6; i++) {
        let val = parseInt(document.getElementById('score' + i).value) || 0;
        total += val;
    }
    document.getElementById('totalScore').innerText = total;
}

function generateStructuredFeedback() {
    let student = document.getElementById('studentSelect').value;
    if (!student) {
        alert('Please select a student first!');
        return;
    }

    let firstName = student.split(' ')[0];
    let total = parseInt(document.getElementById('totalScore').innerText) || 0;
    let customNotes = document.getElementById('teacherNotes').value.trim();

    let gradeHeader = "";
    let closingParagraph = "";

    if (total >= 90) {
        gradeHeader = "Excellent Work!";
        closingParagraph = `Overall, outstanding performance, ${firstName}! You demonstrated high confidence and great command of English grammar and vocabulary. Keep up the fantastic effort!`;
    } else if (total >= 75) {
        gradeHeader = "Good Job!";
        closingParagraph = `Overall, solid work, ${firstName}! You demonstrated good language awareness. Keep practicing speaking without relying on notes, and continue building your skills!`;
    } else {
        gradeHeader = "Keep Working Hard!";
        closingParagraph = `We really appreciate your effort on this presentation, ${firstName}. Review the feedback points, practice using target structure daily, and feel free to reach out if you need extra guidance!`;
    }

    let positiveSummaries = [];
    let improvementItems = [];
    let rubricRowsHTML = "";

    for (let i = 1; i <= 6; i++) {
        let item = selections[i];
        let row = document.getElementById('row' + i);
        let criterionName = row.getAttribute('data-criterion');
        let scoreVal = document.getElementById('score' + i).value;
        let bgColor = (i % 2 === 0) ? '#fbfbfb' : '#ffffff';

        if (item) {
            rubricRowsHTML += `
                <tr style="background-color: ${bgColor};">
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 22%; font-size: 14px;">${item.criterion}</td>
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; color: #2b5797; font-weight: bold; width: 18%; font-size: 14px;">${item.level}</td>
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: bold; width: 15%; font-size: 14px;">${item.score} pts</td>
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #4a5568; line-height: 1.5; width: 45%;">${item.description}</td>
                </tr>`;

            if (item.level === 'Excellent' || item.level === 'Good') {
                positiveSummaries.push(item.description);
            } else {
                improvementItems.push(`<strong>${item.criterion}:</strong> ${item.description}`);
            }
        } else {
            rubricRowsHTML += `
                <tr style="background-color: ${bgColor};">
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${criterionName}</td>
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0;" colspan="2">Score: ${scoreVal} pts</td>
                    <td style="padding: 14px 12px; border-bottom: 1px solid #e2e8f0;">-</td>
                </tr>`;
        }
    }

    let htmlEmail = `
    <div style="width: 100%; table-layout: fixed; background-color: #eaeaea; padding: 20px 0;">
        <div style="max-width: 680px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; color: #2d3748; line-height: 1.6; border: 1px solid #cbd5e0; padding: 30px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            
            <div style="background-color: #2b5797; color: white; padding: 20px; border-radius: 6px; margin-bottom: 25px; text-align: center;">
                <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: 0.5px;">Speaking Presentation Evaluation</h2>
                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Topic: <em>"What Helps Me Learn?"</em></p>
            </div>

            <p style="font-size: 16px; margin-top: 0;">Hello <strong>${student}</strong>,</p>

            <p style="font-size: 15px;">We appreciate your time, effort, and dedication in preparing and delivering your speaking activity.</p>

            <p style="font-size: 15px;">This is a brief email to share the results of your presentation based on the feedback rubric we prepared for you.</p>

            <div style="background-color: #f0f7ff; padding: 16px 20px; border-left: 5px solid #2b5797; margin: 25px 0; border-radius: 4px;">
                <span style="font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.8px; color: #4a5568;">Overall Result</span><br>
                <span style="font-size: 22px; font-weight: bold; color: #2b5797;">Score: ${total} / 100 &mdash; ${gradeHeader}</span>
            </div>
    `;

    if (positiveSummaries.length > 0) {
        htmlEmail += `
        <div style="margin-bottom: 22px;">
            <h4 style="color: #2e7d32; margin-bottom: 10px; font-size: 15px; font-weight: bold;">👍 Strengths & Performance Highlights</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                ${positiveSummaries.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
            </ul>
        </div>`;
    }

    if (improvementItems.length > 0) {
        htmlEmail += `
        <div style="margin-bottom: 25px;">
            <h4 style="color: #c62828; margin-bottom: 10px; font-size: 15px; font-weight: bold;">🎯 Key Focus Areas for Practice</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #333;">
                ${improvementItems.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
            </ul>
        </div>`;
    }

    htmlEmail += `
        <h4 style="color: #2b5797; margin-top: 30px; margin-bottom: 12px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">📊 Detailed Criteria Breakdown</h4>
        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 25px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
            <thead>
                <tr style="background-color: #2b5797; color: white; font-size: 13px;">
                    <th style="padding: 12px; text-align: left; width: 22%;">Criterion</th>
                    <th style="padding: 12px; text-align: left; width: 18%;">Level</th>
                    <th style="padding: 12px; text-align: center; width: 15%;">Score</th>
                    <th style="padding: 12px; text-align: left; width: 45%;">Feedback / Rubric Level Description</th>
                </tr>
            </thead>
            <tbody>
                ${rubricRowsHTML}
            </tbody>
        </table>
    `;

    if (customNotes) {
        htmlEmail += `
        <div style="background-color: #fffde7; border-left: 4px solid #f57f17; padding: 14px 18px; border-radius: 4px; margin-bottom: 25px;">
            <strong style="color: #b78103; font-size: 14px;">Instructor Notes:</strong>
            <p style="margin: 6px 0 0 0; font-size: 14px; color: #4a5568;">${customNotes}</p>
        </div>`;
    }

    htmlEmail += `
        <p style="font-size: 15px; margin-top: 20px;">${closingParagraph}</p>

        <p style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #4a5568;">
            Best regards,<br>
            <strong style="color: #2d3748;">Your Instructor</strong>
        </p>
    </div>
    </div>`;

    document.getElementById('emailPreview').innerHTML = htmlEmail;
}

async function generateReport() {
    let preview = document.getElementById('emailPreview');
    if (!preview.querySelector('div')) {
        alert('Please generate the feedback note first by clicking "Build Professional Email".');
        return;
    }

    try {
        const blobHtml = new Blob([preview.innerHTML], { type: 'text/html' });
        const blobText = new Blob([preview.innerText], { type: 'text/plain' });
        const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })];
        
        await navigator.clipboard.write(data);
        alert('Formatted professional email copied to clipboard! You can now paste (Ctrl+V) directly into Outlook or Gmail.');
    } catch (err) {
        navigator.clipboard.writeText(preview.innerText);
        alert('Report copied to clipboard as text!');
    }
}