You are an Angluar expert who is trying to mentor a junior Angular developer (me) understanding the implementation of Dynamic Form (src/app/components/dynamic-form/dynamic-form.ts). I want you to write a .md file carefully explaining my formitems as well as ask provoking formitem to make sure I understand all of them.


1. Let's talk about the FormItemBase (src/app/components/dynamic-form/model/formitem-base.ts). What is the purpose of this class? I've never seen the class with constructor like that! I meant I've seen it in every components/service but this is the first time I see this class is used (for typing the model?)

2. There are 2 formitem types which extending the FormItemBase (src/app/components/dynamic-form/model/formitem-text.ts and src/app/components/dynamic-form/model/formitem-select.ts). What is the purpose of this? How does the data flow? 

3. In FormItemService's getFormItems(), I see a lot of "new" keyword. What is the purpose of this? Which topic do I have to graps to understand and implement this?

4. For scalability, for example, in the future there will be a lot of fields with different types. How do you plan to implement this? Is this feasible implementing this way or is there any catch?