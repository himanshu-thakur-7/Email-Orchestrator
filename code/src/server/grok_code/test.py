import requests

def main():
    try:
        url = "http://127.0.0.1:8000/process_email"
        files= None
        data = {"email_body": "Hi Wells Fargo Loss Mitigation,\n\nMy name is Samuel Prescott with the loan account #987654321. I am reaching out to discuss potential modifications to my loan payment plan under the recent government relief initiatives for homeowners. The economic slowdown has placed considerable strain on my finances, making it challenging to meet my agreed mortgage payments.\n\nI would like to propose a revised payment plan that better fits my current income level, ensuring I can continue to manage my financial obligations without defaulting. Could you provide me with information on what governmental programs might suit my case, and any required steps to adjust my mortgage plan?\n\nThank you for considering my situation.\n\nKind regards,\n\nSamuel Prescott"}

        response = requests.post(url, files=files, data=data)
        print(response.text)
    except Exception as e:
        print(e)

main()