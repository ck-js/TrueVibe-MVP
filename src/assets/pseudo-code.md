// now that our quiz component is successfully running with answer and email submissions to our postgresql database.
// now need to work on the login and user authetnitcation feature and functionality.
// set up user management postgresql database with vue.
// be wary of local vs online auth registration.
// possibly set up vue routers to navigate between auth and account components on successful auth.
// go through using supabase with vue router for authentication feature
// refactor to follow folder and design pattern of vue school guide
// note to self that our quiz submission needs to be updated since we're not using the supabase object by importing the supabase composable.

// now that we disabled row level security so that we're able to invoke our edge function which calculates quiz scores and updates the score column.
// work on self asesment structure and, logic and layout
// ok we now have new content with category and choice descriptions as part of the ui and quiz has been submitted to database
// now think about posting to quiz_auth_responses table that uses the users uid as the primary key in the auth_quiz_responses table
// check if the uid is the same in dashboard > authentication > users vs dashboard > table editor > profiles and wahts the benefit to split it?
// now for some reason our quiz is rendering the email submission page after the second question...



[Relationship Clarity] "How clear is your vision for your life and the kind of relationship you want?"
1 = Not at all clear, 5 = Very clear
[Relationship Clarity] "How confident are you in knowing and sticking to your non-negotiable requirements for a partner?"
1 = Not at all confident, 5 = Very confident
[Personal Stability] "How satisfied are you with your life as it is, without needing a relationship to feel complete?"
1 = Not at all satisfied, 5 = Very satisfied
[Personal Stability] "How free are you from past relationship baggage and available to start a new one?"
1 = Not at all free, 5 = Very free
[Personal Stability] "How well does your work support your life and leave room for a new relationship?"
1 = Not at all well, 5 = Very well
[Personal Stability]"How much do you feel your health supports the life and relationship you want?"
1 = Not at all, 5 = Very much
[Personal Stability] "How free are you from financial or legal issues that could affect a relationship?"
1 = Not at all free, 5 = Very free
[Social Support] "How much do your family relationships support, rather than hinder, a new romantic relationship?"
1 = Not at all, 5 = Very much
[Emotional Regulation] "How comfortable are you setting boundaries and choosing who to connect with in dating?"
1 = Not at all comfortable, 5 = Very comfortable
[Emotional Regulation] "How confident are you in your ability to build and maintain a healthy, intimate relationship?"
1 = Not at all confident, 5 = Very confident
[Emotional Regulation] "How comfortable are you with a partner giving you constructive criticism or expressing disagreement?"
1 = Not at all comfortable, 5 = Very comfortable
[Emotional Regulation] "How important is it to you that disagreements with a partner stay calm and never involve physical tension?"
1 = Not at all important, 5 = Very important
[Emotional Regulation] "How easy is it for you to communicate your comfort level with physical or sexual closeness in a relationship?"
1 = Not at all easy, 5 = Very easy
[Emotional Regulation] "How much do you rely on a partner to feel valued or supported, versus finding that within yourself?"
1 = Rely completely on partner, 5 = Rely completely on myself
[Emotional Regulation] "How confident are you in managing your own needs (like finances or self-care) if a partner isn’t around to help?"
1 = Not at all confident, 5 = Very confident
[Attachment Security] "How confident are you that a relationship can stay strong and committed over many years?"
1 = Not at all confident, 5 = Very confident
[Attachment Security] "How comfortable are you staying calm when a partner raises their voice or shows strong emotion during a disagreement?"
1 = Not at all comfortable, 5 = Very comfortable
[Attachment Security] "How much does it bother you if a partner’s behavior feels unpredictable or inconsistent?"
1 = Not at all, 5 = Very much
[Attachment Security] "How comfortable are you supporting a partner through emotional ups and downs without losing your own balance?"
1 = Not at all comfortable, 5 = Very comfortable
[Attachment Security] "How do you feel about relying on a partner who might not always be available when you need them?"
1 = Very uncomfortable, 5 = Very comfortable
[Relationship Intentions] "How much do you value building a deep, lasting connection with a partner compared to enjoying the moment and seeing where things go?"
1 = I’m all about the moment, 5 = I prioritize a lasting connection
[Relationship Intentions "How important is it to you to share future plans—like goals or milestones—with a partner early on in dating?"
1 = Not important at all, 5 = Very important
[Relationship Intentions] "How comfortable are you with a relationship staying casual versus one that grows into something exclusive and serious over time?"
1 = I prefer casual, 5 = I prefer serious and exclusive





import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req: Request) => {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow POST and OPTIONS methods
  headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers,
      status: 204, // No content
    });
  }

  if (req.method === 'POST') {
    const { user_id, answers } = await req.json();

    if (!user_id || !answers) {
      return new Response(JSON.stringify({ error: 'User ID and answers are required.' }), {
        headers,
        status: 400,
      });
    }

    // Logic to update the profiles table with self-assessment answers
    const { error } = await supabase
      .from('profiles')
      .update({ self_assessment_answers: answers })
      .eq('id', user_id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers,
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: 'Self-assessment answers submitted successfully.' }), {
      headers,
    });
  } else {
    return new Response('Method not allowed', { status: 405 });
  }
});




curl -L -X POST 'https://rattfxpufuehmlmakbam.supabase.co/functions/v1/submit_self_assessment_v2' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdHRmeHB1ZnVlaG1sbWFrYmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDcwNjMsImV4cCI6MjA1NDE4MzA2M30.TqUxlVuMnU9GrlHiEkwe2HLKSOJgJtKnPml4z-xvUng' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'



Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdHRmeHB1ZnVlaG1sbWFrYmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDcwNjMsImV4cCI6MjA1NDE4MzA2M30.TqUxlVuMnU9GrlHiEkwe2HLKSOJgJtKnPml4z-xvUng'


curl -L -X POST 'https://rattfxpufuehmlmakbam.supabase.co/functions/v1/submit_self_assessment_v2' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdHRmeHB1ZnVlaG1sbWFrYmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDcwNjMsImV4cCI6MjA1NDE4MzA2M30.TqUxlVuMnU9GrlHiEkwe2HLKSOJgJtKnPml4z-xvUng' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Functions"}'