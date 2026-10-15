/* Personalize this file. Bump version after changing the invitation.
   WhatsApp: international digits only, no +, spaces, or leading 00. */
window.DATE_CONFIG = {
  version: '1.0',
  title: 'وزارة الطلعات والشؤون الزوجية',
  husbandName: '', wifeName: '', wifePhone: '', soundDefault: false,
  branding: { credit: 'A LITTLE LOVE, A LITTLE DRAMA', coral: '#FF718F', lavender: '#B79AF5' },
  opening: {
    label: 'استدعاء رسمي من الإدارة العليا',
    question: 'حبيبي… حاب تعزمني ع طلعة؟',
    subtitle: 'فكّر منيح قبل ما تجاوب… مستقبلك العاطفي بيعتمد عهالقرار 🙂',
    intro: 'أهلاً بالمتّهم… قصدي بالحبيب! ♡',
    yesLabel: 'إي 😍', noLabel: 'لا 🙄',
    success: ['هيك بدي ياك! عرفت إنك بتحبني 😍❤️', 'بس لا تتحمس كتير… لسا في كم قرار مهم 😂'],
    approval: 'تم قبول طلب العزيمة من الإدارة العليا',
    noMessages: ['لوين يا حبيبي؟ 😂', 'زر اللا مو متاح بهالعلاقة 🙂', 'عم تحاول ترفضني يعني؟ 😭', 'حبيبي الخيار التاني أحلى، صدقني 😌', 'واضح إنك ما قرأت الشروط والأحكام 😂', 'تم إلغاء حق الاعتراض بقرار من الإدارة العليا 🚨', 'حتى الزر مو موافق إنك تقول لا 😭', 'يا روحي كبسة إي ما بتوجع، جرّبها ❤️', 'المفتّش تعب من كتر ما عم يهرب معك 😂', 'آخر تحذير… اختار إي وخلّصنا من هالمسلسل 🙂'],
    escapeStyles: ['dodge', 'jump', 'wobble', 'spin'],
    emotions: ['mischievous', 'suspicious', 'shocked', 'angry', 'exhausted'],
    warningThreshold: 3,
    warning: 'نسبة نجاح خيار لا: 0%… بس منقدّر إصرارك',
  },
  stages: [
    { id: 'day', short: 'اليوم', icon: '📅', title: 'إمتى بدك نطلع يا روحي؟', subtitle: 'اختار اليوم المناسب… وفكّر منيح قبل ما تجاوب 🙂', correctId: 'fri', success: 'هييييك! شايف لما بتستخدم إحساسك؟ 😍', animation: 'bounce', emotion: 'happy', options: [
      { id: 'thu', label: 'الخميس', icon: '🗓️', note: 'نسبق الويكند', emotion: 'suspicious', reaction: 'shake', messages: ['الخميس؟ يعني ما عندك وقت غير لما أكون مشغولة؟ 🙂', 'بعدك مصرّ عالخميس؟ رزنامتك غير رزنامتي؟ 😂', 'الخميس عندي موعد مع تأجيل طلعة الخميس 😌'] },
      { id: 'fri', label: 'الجمعة', icon: '🌷', note: 'على رواق', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'sat', label: 'السبت', icon: '☀️', note: 'آخر الأسبوع', emotion: 'shocked', reaction: 'tilt', messages: ['السبت؟ حلو… بس أنا قلت الجمعة بقلبي، ما سمعتني؟ 😂', 'رجعت للسبت؟ جرّب تسمع قلبي أحسن 😭', 'السبت محجوز للتعافي من طلعتنا يا روحي 😂'] },
      { id: 'sun', label: 'الأحد', icon: '☁️', note: 'بداية حلوة', emotion: 'angry', reaction: 'shake', messages: ['الأحد؟ بدك تبلّش الأسبوع بمشكلة يعني؟ 😭', 'الأحد عندي دوام نكد إذا ضلّيت تختارو 😂', 'ما بدنا نأجّل الفرحة للأحد يا حبيبي 🙂'] }
    ] },
    { id: 'place', short: 'المكان', icon: '📍', title: 'طيب وين بدك تاخدني؟', subtitle: 'هون بدنا نشوف إذا بتعرف ذوقي عنجد 😌', correctId: 'restaurant', success: 'شاااطر! والله إنك بتفهمني 😍', animation: 'bounce', emotion: 'proud', options: [
      { id: 'restaurant', label: 'مطعم', icon: '🍽️', note: 'دلع وعشا', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'cafe', label: 'كافيه', icon: '☕', note: 'قهوة وحكي', emotion: 'suspicious', reaction: 'tilt', messages: ['قهوة؟ يعني بدك تجوعني وتقعد تتفرّج عليّ؟ 🙂', 'قهوة كمان؟ معدتي مو ماكينة إسبريسو 😂', 'الكافيه بعد الأكل… ركّز يا حبيبي 😌'] },
      { id: 'cinema', label: 'سينما', icon: '🎬', note: 'فيلم وبوشار', emotion: 'shocked', reaction: 'shake', messages: ['آهاا يعني بدك ساعتين ما تحكي معي؟ فهمت عليك 😂', 'رجعت اخترت السينما؟ هيك بدك تهرب مني؟ 😂', 'الفيلم الحقيقي هو محاولاتك تقنعني بالسينما 😭'] },
      { id: 'park', label: 'حديقة', icon: '🌳', note: 'هوا وتغيير جو', emotion: 'exhausted', reaction: 'tilt', messages: ['حديقة؟ يعني بدك تتمشّيني مشان ما تدفع؟ مكشوفة 😭', 'الشجر حلو بس ما عندو منيو يا روحي 😂', 'منمشي بعد ما ناكل… اتفقنا؟ 🙂'] }
    ] },
    { id: 'food', short: 'الأكل', icon: '🍕', title: 'شو رح تطعمني يا حبيبي؟', subtitle: 'دير بالك… هاد أهم قرار لحد هلق 😂', correctId: 'pizza', success: 'يا عيني عليك! هيك الواحد بيعرف شو بحب 😍', animation: 'bounce', emotion: 'happy', options: [
      { id: 'shawarma', label: 'شاورما', icon: '🌯', note: 'الحب مع زيادة ثوم', emotion: 'suspicious', reaction: 'shake', messages: ['شاورما؟ يا روحي بدي دلع مو بس ثوم 😂', 'الثوم مو العطر اللي ببالي لهالطلعة 😭', 'منحب الشاورما… بس اليوم بدنا قصة تانية 😌'] },
      { id: 'pizza', label: 'بيتزا', icon: '🍕', note: 'قطعة إلك… والباقي إلي', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'burger', label: 'برغر', icon: '🍔', note: 'موعد دبل', emotion: 'angry', reaction: 'tilt', messages: ['برغر؟ حلو بس مو اللي نفسي فيه 😒', 'حتى لو دبل… الجواب لسا لأ 😂', 'قلبي مو بين خبزتين يا روحي 🙂'] },
      { id: 'sushi', label: 'سوشي', icon: '🍣', note: 'شي مختلف', emotion: 'shocked', reaction: 'shake', messages: ['سوشي؟ حبيبي نحنا بطلعة مو بتحدي أكل 😭', 'أنا بدي عشا، مو امتحان عيدان 😂', 'خلّينا نطبخ القرار شوي قبل ما ناكلو نيّ 😌'] }
    ] },
    { id: 'time', short: 'الوقت', icon: '⏰', title: 'وعلى كم الساعة سعادتك؟', subtitle: 'دير بالك تختار وقت يخليني استناك 🙂', correctId: 'seven', success: 'هيييي! أخيراً وصلت للجواب الصح 😍', animation: 'bounce', emotion: 'proud', options: [
      { id: 'four', label: '4:00 العصر', icon: '🕓', note: 'بكير شوي', emotion: 'shocked', reaction: 'shake', messages: ['أربعة؟ يا حبيبي أنا لسا ما بلّشت تجهيز 😂', 'عالأربعة بكون عم قرّر شو ألبس بس 😭', 'أربعة؟ بدك موعد ولا سباق مع الوقت؟ 🙂'] },
      { id: 'six', label: '6:00 المسا', icon: '🕕', note: 'قبل الغروب', emotion: 'angry', reaction: 'tilt', messages: ['ستة؟ يعني بدك تستعجل الملكة وهي عم تتحضّر؟ 😭', 'الآيلاينر لحالو بدو وقت زيادة 😂', 'ستة قريبة… بس مو لهالدرجة 😌'] },
      { id: 'seven', label: '7:00 المسا', icon: '🕖', note: 'أول السهرة', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'nine', label: '9:00 المسا', icon: '🕘', note: 'سهرة طويلة', emotion: 'exhausted', reaction: 'shake', messages: ['تسعة؟ شو رأيك نطلع بكرا الصبح بالمرة؟ 🙂', 'بكون جعت وأكلت وزعلت لحد التسعة 😂', 'موعدنا عشا… مو سحور يا قلبي 😭'] }
    ] }
  ],
  comedy: {
    levels: [{at:0,text:'الأمور بالسليم 😌'}, {at:3,text:'الوضع حساس شوي 🙂'}, {at:6,text:'انتبه عحالك 😤'}, {at:9,text:'تم إعلان حالة الطوارئ 🚨'}, {at:12,text:'الله يعينك يا بطل 😂'}],
    events: [{at:6,id:'exhaustion',emotion:'exhausted',message:'أنا بستقيل… كمّل لحالك 😂'}, {at:9,id:'warning',emotion:'angry',message:'تحذير رسمي: اختياراتك عم تهدد استقرار الطلعة 🙂'}],
    secretsEnabled: true, freedomLabel: 'بدي اختار بحرّيتي', freedomMessage: 'تم رفض طلبك من الإدارة العليا. شكراً لتفهّمك 😂',
    inspectorMessage: 'ششش… أنا معك، بس المديرة عم تراقبنا 🤫',
    confidence: 'شايف؟ كنت بعرف إنك بتعرف تختار… بعد كم محاولة بس 😂'
  },
  finale: {
    heading: 'تصريح طلعة رومانسية معتمد', greeting: 'مبروك يا بطل!',
    subtitle: 'قدرت تختار نفس اللي بدي ياه تماماً. يا للصدفة! 😂',
    seal: 'معتمد بالحب', closing: 'بس الأهم إنو رح نكون سوا ❤️',
    punchline: 'مبروك! ربحت الحق إنك تدفع الحساب 😂',
    whatsappLabel: 'أكد الطلعة لحبيبتك 💚', restartLabel: 'عيد المغامرة من أولها 😂',
    message: 'حبيبتي {wife} ❤️\n\nأنا {husband} بعزمك يوم {day} عـ{place} الساعة {time}، ورح ناكل {food}.\n\nوبشهد إني اخترت كل هالقرارات بإرادتي الحرة تماماً، وما حدا أجبرني 😂❤️\n\nجهّزي حالك، عنا موعد سوا 💕'
  }
};
