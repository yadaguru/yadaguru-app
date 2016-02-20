CREATE TABLE IF NOT EXISTS schools (
  id        SERIAL PRIMARY KEY NOT NULL,
  name      TEXT               NOT NULL,
  due_date  DATE               NOT NULL,
  is_active BOOLEAN            NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS reminders (
  id        SERIAL PRIMARY KEY NOT NULL,
  timeframe TEXT               NOT NULL,
  name      TEXT               NOT NULL,
  message   TEXT               NOT NULL,
  detail    TEXT               NOT NULL
);

INSERT INTO reminders (timeframe, name, message, detail) VALUES

  ('To do Immediately',
   'VISUAL ARTS MAJORS Start your Portfolio',
   'If you are creating a portfolio you should start compiling the needed pieces now!',
   '<p>Give yourself plenty of time to assemble your portfolio.&nbsp;</p><p>Start early get advice about your best work from others and maybe create a few more.  By thinking about this early you''ll have time to present your best works.&nbsp;</p><p>This would also be a good time to check the school''s website and find out how the school wants you to submit your works.  Usually it''s through an online portal.  So get familiar with this link and how to upload to it.</p>'),

  ('To do Immediately',
   'Know your Application',
   'Visit Temple''s website and get familiar with their application process.',
   '<p>If you haven''t already spend some quality time&nbsp;on Temple''s website.&nbsp;You need to take note of key things <i>deadlines essay requirements how they want to receive your application etc.</i> Your main goal here is to get organized and make sure you know <b><i>exactly</i></b> what the school expects. Applications that are not completely properly may not be considered!</p><h4>You''re probably a little a little late with this one.<br></h4><p>If you''re seeing this message it''s because you''ve passed Yadaguru''s recommended date to complete this piece. &nbsp;</p><p>What to do?&nbsp;&nbsp;Hustle! &nbsp;Try to get this done asap!</p>'),

  ('To do Immediately',
   'Request Transcripts',
   'Have you figured out how to request your transcripts to be sent to Temple?',
   '<p>The most important piece of your college applications is arguably your transcript or grade record. You''ll want to make sure that Temple gets this piece as soon as possible. They usually can''t process your application without it. To learn more about your transcript and its importance check out our&nbsp;<a href=''http//yadaguru.com/#/faqs'' target='';''>FAQ</a>.</p><p><i>NOTE If Temple uses&nbsp;<a href=''https//www.commonapp.org/'' target=''''>Common App</a>&nbsp;or&nbsp;<a href=''https//www.universalcollegeapp.com/'' target=''''>Universal Application</a></i><i> make sure you ''invited'' your guidance counselor to upload your transcripts and his/her recommendation for you.</i></p><h5>You''re probably a little a little late with this one.<br></h5><p>If you''re seeing this message it''s because you''ve passed Yadaguru''s recommended date to complete this piece. &nbsp;</p><p>What to do?</p><ol><li>Before Temple''s submission date Hustle! &nbsp;Try to get this done asap.</li><li>After Temple''s submission date Call Temple''s admissions office explain the situation and see if they will accomodate you.&nbsp;</li></ol>'),

  ('To do Immediately',
   'Recommendation Packet',
   'Deliver needed forms for Temple to your Recommenders and Counselors',
   '<p>Hopefully you have already asked teachers and your counselor if they will write recommendations. You should give each one of them all the information they need to complete a recommendation. This usually includes</p><div><ul><li>Recommendation questions (if any), or in some cases printed recommendation forms</li><li>Due date(s), of your application</li><li>Stamped pre-addressed envelopes*</li><li>Any other important directions</li><li>A copy of your resume or activities list (This will help them brag about you!),</li></ul><i>*NOTE If the school you are applying to has an online application system for recommendations then you do not need any envelopes or stamps. Just make sure that your recommenders know how to login to submit their recommendation.</i>'),

  ('To do Immediately',
   'Start your Application',
   'Have you started your Temple application yet?',
   '<h4>ONLINE COMMON APPLICATION EDUInc. or UNIVERSAL APPLICATION?&nbsp;</h4><p>You should log into the online application system for this school and create a user fill in your basic information and get your application started.&nbsp;</p><p>If Temple uses Common Application you should create an account on <a href=''http//www.commonapp.org'' target=''''>http//www.commonapp.org.</a>  If Temple uses EDU Inc. Common Black College Application you should create an account on <a href=''http//www.eduinconline.com/'' target=''''>http//www.eduinconline.com/</a>.  If Temple uses Universal Application you should create an account on  <a href=''http//www.universalcollegeapp.com/'' target=''''>http//www.universalcollegeapp.com/</a>.&nbsp;</p><p><br></p><h4>PAPER APPLICATION?&nbsp;</h4><p>If you''re submitting a <b>PAPER APPLICATION</b> download print and/or start filling it out. Sometimes your online or print application will require an essay to be submitted with it so make sure you check.  If you''re unsure about any parts of the application call Temple''s admissions office to make sure you''re filling it out properly.<br></p>'),

  ('To do Immediately',
   'Ask Teachers for Recommendations',
   'Do you need recommendations for your Temple application?',
   '<p>Generally you want to figure out who you will ask to write your recommendations and ask them AS SOON AS POSSIBLE. Remember recommendations are a privilege not a right so be sure to&nbsp;<b><i>ask</i></b>!&nbsp;</p><p>Check the guidelines of your Temple application to see how many recommendations you''ll need if any. &nbsp;<br><br><b>USING COMMON&nbsp;EDU Inc. or UNIVERSAL APP?</b>&nbsp;In order for your teachers/counselors to complete your recommendations you must invite them from your online application account. You''ll need their name and working email address to accomplish this properly. (Any typos or mistakes will result in invite getting lost in cyber space!),</p>'),

  ('To do Immediately',
   'Start Essays',
   'Start writing your essays right away!',
   'Essays are usually the hardest and most time-consuming part of the application so you should get started as soon as possible.  Read and re-read what''s required for Temple and start to think about how you will answer the essays. Be careful to note the number of essays required!'),

  ('To Do By 12/17/2015',
   'VISUAL ARTS MAJORS Prep Your Portfolio',
   'VISUAL ARTS MAJORS If you need to prepare your artwork for an online portfolio you don''t want to leave it to the last minute!',
   '<p>While hopefully the artwork itself has been completed for a while your portfolio will probably need to be submitted online.</p><p>Temple may want you to submit your portfolio through another application like&nbsp;<a href=''http//slideroom.com'' target=''''>slideroom.com</a>.</p><p>Make sure you visit Temple''s website and know HOW to submit that portfolio. In some cases you may need to create a user in something like slideroom in order to submit. &nbsp;See our <a href=''http//yadaguru.com/#/faqs'' target=''''>FAQs</a> for more information about submitting portfolios.&nbsp;</p>'),

  ('To Do By 12/17/2015',
   'Ask Counselor for Recommendation',
   'Have you asked your counselor to fill out any Secondary School report or a recommendation for you?',
   '<p>Follow any instructions regarding Secondary School Reports Counselor Forms or other recommendations if  required by Temple.  You may need to download and print a physical copy or provide your counselor with a link if online. <br><br><i><b>NOTE</b> If you are using <a href=''https//www.commonapp.org/'' target=''''>Common App</a> or <a href=''https//www.universalcollegeapp.com/'' target=''''>Universal Application</a></i> <i>make sure you have successfully invited your counselor to upload their recommendation for you.</i></p>'),

  ('To Do By 12/17/2015',
   'Request Transcripts',
   'Request your transcripts to be sent to Temple',
   '<p>It''s only 60 days until your application for Temple is due!<br><br>Make sure you know the process get any proper paperwork and follow the directions of your high school regarding transcript release. They''ll probably need a mailing address for the Temple admissions office too so go prepared!<br><i><br></i></p><p><i>NOTE If Temple uses <a href=''https//www.commonapp.org/'' target=''''>Common App</a> or <a href=''https//www.universalcollegeapp.com/'' target=''''>Universal Application</a> make sure you invited your guidance counselor to upload your transcripts and his/her recommendation for you.</i></p>'),

  ('To Do By 12/17/2015',
   'Application Fee',
   'Did you pay the application fee?',
   '<p>You often have to pay the fee before colleges and universities will process your application. Sometimes you can''t even submit an online application until you pay.<br><br>Before you pay those fees (or start worrying about them), find out if you qualify for that fee to be waived. &nbsp;See our <a href=''http//yadaguru.com/#/faqs'' target=''''>FAQs</a> to learn about fee waivers.</p>'),

  ('To Do By 12/17/2015',
   'Essay Reminder',
   'How are those essays for Temple coming?',
   '<p>If you have essays to do for Temple you''ve got 60 days until your application is due.&nbsp;</p><p>Do you have a first and maybe second draft done yet? Identify a knowledgeable adult who can help you edit your essays so that they really reflect what you want to share.</p><p><i>NOTE</i><b></b><i><b> </b>If you''re writing the Common Application essays beware of stealth questions; sometimes additional questions pop up after you''ve answered another...and they can really require some thought! The sooner you tackle the essay portions the better off you''ll be when dealing with those questions.</i></p>'),

  ('To Do By 12/27/2015',
   'Register for the SAT test',
   'If you''re planning on taking the SAT Test on 1/22/2016 you must register by 12/27/2015.',
   '<p>Go to the College Board site and register to take the SAT.  Go to <a href=''https//sat.collegeboard.org/register'' target=''''>https//sat.collegeboard.org/register</a>.  Remember to include the schools you are applying to as a recipient of your test scores.</p>'),

  ('To Do By 1/1/2016',
   'FAFSA Opens',
   'FREE Application for Federal Student Aid opens on January 1',
   '<p>Now that maybe you''ve finished most of your college applications you have the task of figuring out how to pay for it! If you are a U.S. citizen you should most definitely fill out the Free Application for Federal Student Aid -- even if you think you won''t receive anything! <br><br>The application opens January 1 and closes on June 30 but you do need to note if Temple or your home state has a <i>filing deadline </i>or <i>financial aid priority deadline</i>.</p><p>For more information about the FAFSA check out the official Federal Student Aid website&nbsp;</p><a href=''https//fafsa.ed.gov/''><b>https//fafsa.ed.gov/</b><b></b></a></h2><h2><a href=''https//fafsa.ed.gov/''><b>https//fafsa.ed.gov/</b><b></b></a>'),

  ('To Do By 1/7/2016',
   'Register for the ACT test',
   'If you''re planning on taking the ACT Test on 2/5/2016 you must register by 1/7/2016.',
   '<p>Go to <a href=''http//actstudent.org'' target=''''>actstudent.org </a>to register for your ACT test  Remember to include the schools you are applying to as a recipient of your test scores.</p>'),

  ('To Do By 1/16/2016',
   'Notify Counselor',
   'Have you asked your counselor to fill out any Secondary School report or a recommendation for you?',
   '<p>On 1/16/2016 you only have 30 days before your application is due and recommendations take time. All of your recommenders are busy people so if you haven''t you should get this to them ASAP!&nbsp;</p><p>Four weeks is a courteous standard for any recommendations but the sooner the better. Follow any instructions regarding Secondary School Reports Counselor Forms or other recommendations if required by Temple. You may need to download and print a physical copy or provide your counselor with a link if online.&nbsp;</p><p><i>NOTE If you are using&nbsp;</i><a href=''https//www.commonapp.org/''><i>Common App</i></a><i>&nbsp;or&nbsp;</i><a href=''https//www.universalcollegeapp.com/''><i>Universal Application</i></a><i>make sure you have successfully invited your counselor to upload their recommendation for you.</i></p>'),

  ('To Do By 1/16/2016',
   'Mailing Recommendations',
   'Are your recommenders sending their letters to Temple via regular mail?',
   '<p>Regular mail takes time! Make sure your recommenders have had time to send their recommendations if they are mailing them via regular mail (ie not online),. Politely check-in with them.</p><p>To streamline the process for them give them an envelope already addressed to Temple''s admission office with plenty of stamps. </p>'),

  ('To Do By 1/16/2016',
   'Submit Regular Mail Essays',
   'If you are sending your essays to Temple via regular mail you should send them by 1/16/2016',
   '<p>Are you mailing your essays using the US Postal Service?&nbsp;</p><p>You''ll want to mail your carefully crafted essays <b>early</b> just in case you need to mail again. There''s usually not much of a grace period if your essays or application forms come in late so respect the deadline. Your application may get delayed or worse you may be disregarded completely!</p>'),

  ('To Do By 1/16/2016',
   'Essay Reminder',
   'Check your progress on your required and optional essays.',
   '<p>It''s only a month until Temple''s deadline!</p><p>If you haven''t be sure to write an essay draft and get some feedback from a teacher or other objective adult who can offer some constructive criticism.&nbsp;</p><p>Check out our <a href=''http//yadaguru.com/#/faqs'' target=''''>FAQs</a> for links on essay writing.</p>'),

  ('To Do By 1/25/2016',
   'Remind Recommenders',
   'Check in with your teachers by 1/25/2016 about the status of Temple recommendations.',
   '<p>Your recommenders are usually very busy humans.  A gentle and kind reminder will help them get their recommendation in on time.&nbsp;</p><p>Remember it is a <i>privilege</i> to have someone write such nice things about you. &nbsp;Be sure to thank them for their time!</p>'),

  ('To Do By 1/25/2016',
   'Call the school',
   'CALL Temple to make sure they''ve received everything!',
   '<p>Admissions offices are very busy places...and they lose things too!</p><p>If you''ve sent items for your application call the school''s admissions office and politely validate that they have received everything they need for your application.  If anything is missing get busy to get it to the school before the deadline.</p><p><i>NOTE Make sure YOU not your parent/guardian call the university. Admissions professionals prefer to hear from the prospective student.</i></p>'),

  ('To Do By 1/25/2016',
   'Request Transcripts',
   'Have you requested your transcripts be sent to Temple yet?',
   '<p>It''s only 21 days until your application for Temple is due!<br><br>Make sure you know the process get any proper paperwork and follow the directions of your high school regarding transcript release. They''ll probably need a mailing address for the Temple admissions office too so go prepared!<br><br><i>NOTE<b> </b>If this university uses <a href=''https//www.commonapp.org/'' target=''''>Common App</a> or <a href=''https//www.universalcollegeapp.com/'' target=''''>Universal Application</a> make sure you invited your guidance counselor to upload your transcripts and his/her recommendation for you.</i></p>'),

  ('To Do By 2/1/2016',
   'Mailing Recommendations',
   'Are your recommenders sending their letters to Temple via regular mail?',
   '<p>Regular mail takes time! Make sure your recommenders have had time to send their recommendations if they are mailing them via regular mail (ie not online),. Politely check-in with them.</p><p>To streamline the process for them give them an envelope already addressed to Temple''s admission office with plenty of stamps. </p>'),

  ('To Do By 2/1/2016',
   'Call the school',
   'CALL Temple to make sure they''ve received everything!',
   '<p>Admissions offices are very busy places...and they lose things too!</p><p>If you''ve sent items for your application call the school''s admissions office and politely validate that they have received everything they need for your application.  If anything is missing get busy to get it to the school before the deadline.</p><p><i>NOTE Make sure YOU not your parent/guardian call the university. Admissions professionals prefer to hear from the prospective student.</i></p>'),

  ('To Do By 2/1/2016',
   'Request Transcripts',
   'If you haven''t request your transcripts be sent to Temple.',
   '<p>It''s only 14 days until your application for Temple is due! Have you asked the guidance office to send your transcripts? Make this a priority this week if you haven''t yet.&nbsp;<br><br><i>NOTE If Temple uses <a href=''https//www.commonapp.org/'' target=''''>Common App</a> or <a href=''https//www.universalcollegeapp.com/'' target=''''>Universal Application</a> make sure you invited your guidance counselor to upload your transcripts and his/her recommendation for you.</i></p>'),

  ('To Do By 2/1/2016',
   'VISUAL ARTS MAJORS Submit your Portfolio',
   'VISUAL ARTS MAJORS Time to submit that portfolio to Temple',
   '<p>After the paint glue sweat and tears have dried it''s time to submit that portfolio!&nbsp;</p><p>Make sure it''s been uploaded correctly and that you actually pressed the submit button.</p><p><i>NOTE Temple may want you to submit your portfolio through another application like <a href=''http//www.slideroom.com'' target=''''>slideroom.com</a>. &nbsp;Make sure you visit Temple''s website and know HOW to submit that portfolio. In some cases you may need to create a user in something like slideroom in order to submit.&nbsp;See our <a href=''http//yadaguru.com/#/faqs'' target=''''>FAQs </a>for more information.&nbsp;</i><br></p>'),

  ('To Do By 2/8/2016',
   'Submit Online Essays',
   'Are you submitting any essays online; email or upload?',
   '<p>It''s exactly a week until Temple''s application deadline.You''ve been working hard on your essays but are they ready?&nbsp;</p><div><br>'),

  ('To Do By 2/8/2016',
   'Submit Online Application',
   'ONLINE APPS ONLY Have you submitted your online application yet?',
   '<p>Maybe this seems silly but we''d hate for you to discover that you did not press that <b>SUBMIT</b> button!<br><br>If you didn''t get a confirmation email or a notification in your online account within a few days after you hit SUBMIT you''ll want to check with the school. <br><br><i>NOTE If there is an application fee required it will might need to be paid or waived before you can SUBMIT.</i></p>'),

  ('To Do By 2/8/2016',
   'Call the school',
   'CALL Temple to make sure they''ve received everything!',
   '<p>Admissions offices are very busy places...and they lose things too!</p><p>If you''ve sent items for your application call the school''s admissions office and politely validate that they have received everything they need for your application.  If anything is missing get busy to get it to the school before the deadline.</p><p><i>NOTE Make sure YOU not your parent/guardian call the university. Admissions professionals prefer to hear from the prospective student.</i></p>'),

  ('To Do By 2/8/2016',
   'Check-in on Online Recommendation',
   'Check-in with your recommenders about any online recommendations for Temple.',
   '<p>Did any of your recommenders complete an online Common Application EDU Inc. or Universal Application recommendation for you?<br><br>This is a good date to check in with your recommenders to see if they have submitted online recommendations including Common Application EDUInc. and Universal Application. Even though online recommendations can usually be instantaneously uploaded these recommendations still take time and effort to complete! Politely check-in with them now to see that they have everything that they need to accomplish it.</p>'),

  ('To Do By 2/8/2016',
   'Mailing Recommendations',
   'Are your recommenders sending their letters to Temple via regular mail?',
   '<p>Regular mail takes time! Make sure your recommenders have had time to send their recommendations if they are mailing them via regular mail (ie not online),. Politely check-in with them.</p><p>To streamline the process for them give them an envelope already addressed to Temple''s admission office with plenty of stamps. </p>'),

  ('To Do By 2/15/2016',
   'Application Submission Date',
   'Temple''s application is due 2/15/2016.',
   '<p>This is the date that Temple should have every part of your application; from essays to recommendations to SAT scores. Some schools require that all pieces are in others will accept them weeks after. <br><br>Check with the university if you fear you might not get a piece in on time. Some colleges are more lenient&nbsp;but <b>don''t assume.</b><br></p>'),

  ('To Do By 5/1/2016',
   'NCDD',
   'National College Decision Day',
   '<p>May 1 is National College Decision Day. If you get accepted to multiple colleges including Temple you''ll need to decide in s wouldlwhich school you will enroll.&nbsp;Usually you must pay an enrollment or housing deposit to secure your space.&nbsp;</p><p>Consider -- Which school is your best fit academically and socially? Which school grants you the most affordable financial aid package?&nbsp;</p><p>Remember It is best to send a deposit to only ONE school. It''s generally considered unethical to send in deposits to multiple schools...not to mention awfully costly to you! Carefully consider your options and make the best choice for you. Ask for help from a knowledgable adult if you''re not sure.</p>');