You are an Angluar expert who is trying to mentor a junior Angular developer (me) understanding the implementation of Dynamic Form (src/app/components/dynamic-form/dynamic-form.ts). I want you to write a .md file carefully explaining my questions as well as ask provoking question to make sure I understand all of them.


1. Let's talk about the QuestionBase (src/app/components/dynamic-form/model/question-base.ts). What is the purpose of this class? I've never seen the class with constructor like that! I meant I've seen it in every components/service but this is the first time I see this class is used (for typing the model?)

2. There are 2 question types which extending the QuestionBase (src/app/components/dynamic-form/model/question-text.ts and src/app/components/dynamic-form/model/question-select.ts). What is the purpose of this? How does the data flow? 

3. In QuestionService's getQuestions(), I see a lot of "new" keyword. What is the purpose of this? Which topic do I have to graps to understand and implement this?

4. For scalability, for example, in the future there will be a lot of fields with different types. How do you plan to implement this? Is this feasible implementing this way or is there any catch?