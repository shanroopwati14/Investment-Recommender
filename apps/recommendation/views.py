from openai import OpenAI
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os

@csrf_exempt
def gpt_response_view(request):
    print('inside gpt')
    if request.method == 'POST':
        user_input = request.POST.get('user_input', 'I am looking for expert investment advice. Can you suggest the top three investment strategies or products that would be best suited for someone aiming to build wealth over the next 5-10 years? Please consider different risk levels and explain why these options would be ideal.')
        print('userinput',user_input)
        try:
            client = OpenAI(
                # This is the default and can be omitted
                api_key=os.environ.get("OPENAI_API_KEY"),
            )

            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "consider yourself as an Investment expert"},
                    {
                        "role": "user",
                        "content": user_input,
                    }
                ],
                model="gpt-4-turbo",
                max_tokens=1000,
                temperature=0.7,
            )

            print('chatcompletion',chat_completion.choices[0].message.content.strip())
            gpt_response = chat_completion.choices[0].message.content.strip()
            # Return response as JSON
            return JsonResponse({'gpt_response': gpt_response})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)




