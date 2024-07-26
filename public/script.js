async function submitText() {
    const text = document.getElementById('textInput').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        alert('Text submitted successfully');
        document.getElementById('textInput').value = '';
    } else {
        alert('Failed to submit text');
    }
}