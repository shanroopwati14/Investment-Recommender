from openai import OpenAI
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
import json

def gpt_call(prompt):
    gpt_response = ''
    try:
        client = OpenAI(
            # This is the default and can be omitted
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system",
                 "content": "consider yourself as an Investment expert"},
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-4-turbo",
            max_tokens=1000,
            temperature=0.7,
        )

        print('chatcompletion', chat_completion.choices[0].message.content.strip())
        gpt_response = chat_completion.choices[0].message.content.strip()
        return JsonResponse({'gpt_response': gpt_response})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)
@csrf_exempt
def gpt_response_view(request):
    print('inside gpt')
    if request.method == 'POST':
        user_input = request.POST.get('user_input', 'I am looking for expert investment advice. Can you suggest the top three investment strategies or products that would be best suited for someone aiming to build wealth over the next 5-10 years? Please consider different risk levels and explain why these options would be ideal.')
        print('userinput',user_input)
        gpt_response=gpt_call(user_input)
        return gpt_response

@csrf_exempt
def gpt_goalrecommendation_view(request):
    print('inside gpt_goalrecommendation')
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        list_of_allform = []

        for form_data in data:
            print(form_data.get('range1'))
            form_list = [form_data.get('goalname'), form_data.get('goalname'), form_data.get('range1'),form_data.get('range2'),form_data.get('risk') ]
            list_of_allform.append(form_list)
        print(list_of_allform)
        user_input = request.POST.get('user_input', f"""please provide the investment recommendation considering all the goals created bu the customer {list_of_allform}""")
        gpt_response = gpt_call(user_input)
        return gpt_response




