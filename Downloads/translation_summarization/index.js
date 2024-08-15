document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('recordButton');
    const recordButtonText = document.getElementById('recordButtonText');
    const downloadButton = document.getElementById('downloadButton');
    const downloadTranslationContent = document.getElementById('downloadTranslationContent');
    const downloadWholeButtonChinese = document.getElementById('downloadWholeButtonChinese');
    const downloadChineseWholeSummaryContent = document.getElementById('downloadChineseWholeSummaryContent');
    const downloadEnglishWholeSummaryContent  = document.getElementById('downloadEnglishWholeSummaryContent');
    const downloadCompleteMessage = document.getElementById('downloadCompleteMessage');
    const summarizeCurrentButtonChinese = document.getElementById('summarizeCurrentButtonChinese');
    const downloadSummaryCompleteMessage = document.getElementById('downloadSummaryCompleteMessage');
    const summarizeCurrentButtonEnglish = document.getElementById('summarizeCurrentButtonEnglish');
    const downloadWholeButtonEnglish = document.getElementById('downloadWholeButtonEnglish');

    let isRecording = false;
    let recordingStopped = false;

    console.log('DOM fully loaded and script running');

    recordButton.addEventListener('click', () => {
        console.log('Record button clicked');
        if (!isRecording) {
            console.log('Starting recording...');
            startRecording();
        } else if (recordingStopped) {
            console.log('Recording already stopped');
            downloadWholeSummaryContentAndClickButton();
        } else {
            console.log('Stopping recording...');
            stopRecording();
        }
    });

    function startRecording() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    isRecording = true;
                    recordingStopped = false;
                    recordButton.classList.add('red');
                    recordButtonText.textContent = 'Stop Recording';
                    summarizeCurrentButtonChinese.style.backgroundColor = 'blue'; // Change to blue when recording
                    summarizeCurrentButtonEnglish.style.backgroundColor = 'blue';

                })
                .catch(error => {
                    console.error("Microphone access denied:", error);
                });
        } else {
            alert('Your browser does not support audio recording.');
            console.log('Browser does not support audio recording.');
        }
    }

    function stopRecording() {
        console.log('Stopping recording...');
        isRecording = false;
        recordingStopped = true;
        recordButtonText.textContent = 'Recording Stopped...';
        recordButton.style.backgroundColor = 'grey'; // change back to grey after stopping
        summarizeCurrentButtonChinese.style.backgroundColor = 'grey';  
        summarizeCurrentButtonEnglish.style.backgroundColor = 'grey';  
        downloadButton.style.backgroundColor = 'blue'; // Change to blue after stopping
        downloadWholeButtonChinese.style.backgroundColor = 'blue';  
        downloadWholeButtonEnglish.style.backgroundColor = 'blue'; 
        
        //auto trigger download 
        downloadChineseWholeSummaryContentAndClickButton();
        downloadEnglishWholeSummaryContentAndClickButton ();
        downloadTranslationContentAndClickButton();
    }

    function downloadTranslationContentAndClickButton() {
        if (downloadTranslationContent) {
            const content = downloadTranslationContent.textContent;
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'translation.txt'; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);


        } else {
            console.error('Download whole summary content element not found.');
        }
    }

    function downloadChineseWholeSummaryContentAndClickButton() {
        if (downloadChineseWholeSummaryContent) {
            const content = downloadChineseWholeSummaryContent.textContent;
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'chinese_whole_summary.txt'; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

             if (downloadCompleteMessage) {
                downloadCompleteMessage.classList.remove('hidden');
            }
        } else {
            console.error('Download whole summary content element not found.');
        }
    }
    function downloadEnglishWholeSummaryContentAndClickButton() {
        if (downloadEnglishWholeSummaryContent) {
            const content = downloadEnglishWholeSummaryContent.textContent;
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'englishwhole_summary.txt';  
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

            if (downloadCompleteMessage) {
                downloadCompleteMessage.classList.remove('hidden');
            }
        } else {
            console.error('Download whole summary content element not found.');
        }
    }
});
