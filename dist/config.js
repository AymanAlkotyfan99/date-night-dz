/* Personalize this file. Bump version after changing the invitation.
   WhatsApp: international digits only, no +, spaces, or leading 00. */
window.DATE_CONFIG = {
  version: '1.2',
  title: 'وزارة الطلعات والشؤون الزوجية',
  husbandName: '', wifeName: '', wifePhone: '963996831623', soundDefault: false,
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
    { id: 'day', short: 'اليوم', icon: '📅', title: 'إمتى بدك نطلع يا روحي؟', subtitle: 'اختار اليوم المناسب… وفكّر منيح قبل ما تجاوب 🙂', correctIds: ['sat', 'sun'], success: 'هييييك! شايف لما بتستخدم إحساسك؟ 😍', animation: 'bounce', emotion: 'happy', options: [
      { id: 'thu', label: 'الخميس', icon: '🗓️', note: 'نسبق الويكند', emotion: 'suspicious', reaction: 'shake', messages: ['الخميس؟ يعني ما عندك وقت غير لما أكون مشغولة؟ 🙂', 'بعدك مصرّ عالخميس؟ رزنامتك غير رزنامتي؟ 😂', 'الخميس عندي موعد مع تأجيل طلعة الخميس 😌'] },
      { id: 'fri', label: 'الجمعة', icon: '🌷', note: 'على رواق', emotion: 'suspicious', reaction: 'shake', messages: ['الجمعة؟ خلّينا السبت أو الأحد يا روحي 😌', 'رجعت للجمعة؟ رزنامة الحب بدها تحديث 😂', 'خلّينا نترك الجمعة للشوق يا روحي 🙂'] },
      { id: 'sat', label: 'السبت', icon: '☀️', note: 'آخر الأسبوع', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'sun', label: 'الأحد', icon: '☁️', note: 'بداية حلوة', emotion: 'happy', reaction: 'bounce', messages: [] }
    ] },
    { id: 'place', short: 'المكان', icon: '📍', title: 'طيب وين بدك تاخدني؟', subtitle: 'هون بدنا نشوف إذا بتعرف ذوقي عنجد 😌', correctId: 'cafe', success: 'شاااطر! والله إنك بتفهمني 😍', animation: 'bounce', emotion: 'proud', options: [
      { id: 'restaurant', label: 'مطعم', icon: '🍽️', note: 'دلع وعشا', emotion: 'suspicious', reaction: 'tilt', messages: ['مطعم؟ اليوم نفسي بقعدة كافيه وحكي معك 😌', 'العشا بيستنى… القهوة عم تناديني 😂', 'يا روحي اليوم الموعد مع فنجان وحكاية 🙂'] },
      { id: 'cafe', label: 'كافيه', icon: '☕', note: 'قهوة وحكي', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'cinema', label: 'سينما', icon: '🎬', note: 'فيلم وبوشار', emotion: 'shocked', reaction: 'shake', messages: ['آهاا يعني بدك ساعتين ما تحكي معي؟ فهمت عليك 😂', 'رجعت اخترت السينما؟ هيك بدك تهرب مني؟ 😂', 'الفيلم الحقيقي هو محاولاتك تقنعني بالسينما 😭'] },
      { id: 'park', label: 'حديقة', icon: '🌳', note: 'هوا وتغيير جو', emotion: 'exhausted', reaction: 'tilt', messages: ['حديقة؟ يعني بدك تتمشّيني مشان ما تدفع؟ مكشوفة 😭', 'الشجر حلو بس ما عندو منيو يا روحي 😂', 'منمشي بعد القهوة… اتفقنا؟ 🙂'] }
    ] },
    { id: 'food', short: 'الأكل', icon: '🌯', title: 'شو رح تطعمني يا حبيبي؟', subtitle: 'دير بالك… هاد أهم قرار لحد هلق 😂', correctId: 'shawarma', success: 'يا عيني عليك! هيك الواحد بيعرف شو بحب 😍', animation: 'bounce', emotion: 'happy', options: [
      { id: 'shawarma', label: 'شاورما', icon: '🌯', note: 'الحب مع زيادة ثوم', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'pizza', label: 'بيتزا', icon: '🍕', note: 'قطعة إلك… والباقي إلي', emotion: 'suspicious', reaction: 'shake', messages: ['بيتزا؟ اليوم قلبي طالب شاورما 😌', 'حتى لو زدنا الجبنة… الجواب لسا لأ 😂', 'خلّي البيتزا لطلعة تانية يا روحي 🙂'] },
      { id: 'burger', label: 'برغر', icon: '🍔', note: 'موعد دبل', emotion: 'angry', reaction: 'tilt', messages: ['برغر؟ حلو بس مو اللي نفسي فيه 😒', 'حتى لو دبل… الجواب لسا لأ 😂', 'قلبي مو بين خبزتين يا روحي 🙂'] },
      { id: 'sushi', label: 'سوشي', icon: '🍣', note: 'شي مختلف', emotion: 'shocked', reaction: 'shake', messages: ['سوشي؟ حبيبي نحنا بطلعة مو بتحدي أكل 😭', 'أنا بدي شاورما، مو امتحان عيدان 😂', 'خلّينا نطبخ القرار شوي قبل ما ناكلو نيّ 😌'] }
    ] },
    { id: 'time', short: 'الوقت', icon: '⏰', title: 'وعلى كم الساعة سعادتك؟', subtitle: 'دير بالك تختار وقت يخليني استناك 🙂', correctId: 'three', success: 'هيييي! أخيراً وصلت للجواب الصح 😍', animation: 'bounce', emotion: 'proud', options: [
      { id: 'three', label: '3:00 العصر', icon: '🕒', note: 'قعدة عالعصر', emotion: 'happy', reaction: 'bounce', messages: [] },
      { id: 'six', label: '6:00 المسا', icon: '🕕', note: 'قبل الغروب', emotion: 'angry', reaction: 'tilt', messages: ['ستة؟ ليش ننطر للمسا يا روحي؟ 😭', 'عالتلاتة بكون جاهزة وناطرة الطلعة 😂', 'خلّينا نلحق قعدة العصر الحلوة 😌'] },
      { id: 'seven', label: '7:00 المسا', icon: '🕖', note: 'أول السهرة', emotion: 'suspicious', reaction: 'shake', messages: ['سبعة؟ كتير متأخر على طلعتنا 😌', 'قلبي حاجز عالتلاتة يا حبيبي 😂', 'بدي شوفك العصر… لا تأجّل الفرحة 🙂'] },
      { id: 'nine', label: '9:00 المسا', icon: '🕘', note: 'سهرة طويلة', emotion: 'exhausted', reaction: 'shake', messages: ['تسعة؟ رح تخلّيني ناطرة كل هالوقت؟ 😭', 'موعدنا عالتلاتة… مو آخر النهار 😂', 'خلّي السهرة لبعدين، اليوم طلعتنا العصر 😌'] }
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
