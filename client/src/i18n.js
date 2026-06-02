import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      nav: {
        accueil: "Accueil",
        groupe: "Le Groupe",
        investir: "Investir en Mauritanie",
        expertises: "Nos Expertises",
        galerie: "Galerie",
        contact: "Contact"
      },
      galerie: {
        seoTitle: "Galerie",
        seoDescription: "Poissons frais et surgelés, sucre, légumes, huiles végétales et lait en poudre — SMTS Group.",
        tag: "Produits & export",
        title1: "Notre ",
        title2: "Galerie",
        subtitle: "Découvrez nos gammes de produits alimentaires et nos solutions d'exportation vers les marchés internationaux.",
        sections: {
          poissons: {
            title: "Poissons Frais & Surgelés",
            headline: "Solutions d'Exportation Sur Mesure",
            paragraphs: [
              "Nous exportons des poissons frais et surgelés selon les besoins spécifiques de nos partenaires internationaux vers l'Europe, l'Asie et l'Afrique",
              "Nous accompagnons également les investisseurs et acheteurs professionnels dans le sourcing et l'acquisition de produits issus du marché local, avec un service fiable, transparent et conforme aux standards du commerce international"
            ]
          },
          sucre: {
            title: "Sucre Blanc Raffiné",
            headline: "Pureté Brésilienne, Qualité Internationale",
            paragraphs: [
              "Nous importons du sucre blanc raffiné brésilien de haute qualité, reconnu pour sa pureté et sa conformité aux standards internationaux",
              "Grâce à un approvisionnement fiable et régulier, nous répondons aux besoins du marché local ainsi qu'aux exigences des partenaires commerciaux régionaux"
            ]
          },
          legumes: {
            title: "Oignons Jaunes & Pommes de Terre",
            headline: "Importation Premium, Distribution Régionale",
            paragraphs: [
              "Nous importons d'importantes quantités d'oignons jaunes et de pommes de terre de haute qualité en provenance des Pays-Bas, de Belgique et d'Égypte, afin d'approvisionner le marché local et de répondre également aux besoins des marchés régionaux à travers la réexportation vers les pays voisins"
            ]
          },
          huiles: {
            title: "Huiles Végétales",
            headline: "Excellence Malaisienne, Pureté Internationale",
            paragraphs: [
              "Nous importons des huiles végétales de haute qualité en provenance de Malaisie, reconnues pour leur pureté, leur stabilité et leur excellence nutritionnelle. Sélectionnées avec soin selon les standards internationaux, elles répondent aux besoins du marché local ainsi qu'aux exigences des professionnels et de l'industrie agroalimentaire"
            ]
          },
          lait: {
            title: "Lait en Poudre",
            headline: "Qualité Internationale, Approvisionnement Fiable",
            paragraphs: [
              "Nous importons du lait en poudre de haute qualité conditionné en sacs de 25 kg, sélectionné auprès de producteurs internationaux reconnus",
              "Grâce à une chaîne d'approvisionnement fiable et performante, nous contribuons à répondre aux besoins du marché mauritanien tout en accompagnant les flux commerciaux vers les marchés des pays voisins",
              "Notre engagement repose sur la qualité, la régularité des approvisionnements et la satisfaction durable de nos partenaires"
            ]
          }
        }
      },
      footer: {
        intro: "Acteur stratégique en Mauritanie : commerce, logistique et facilitation d'investissement pour entreprises et investisseurs internationaux.",
        quick: "Liens rapides",
        coord: "Coordonnées",
        rights: "Tous droits réservés.",
        loc: "Nouakchott, Mauritanie"
      },
      accueil: {
        heroTitle1: "Bâtissons l'avenir de vos investissements ",
        heroTitle2: "en Mauritanie",
        heroSubtitle: "SMTS Group accompagne les investisseurs et entreprises avec des solutions intégrées en commerce, logistique et facilitation d'affaires sur toute la chaîne de valeur.",
        btnExpertises: "Découvrir nos expertises",
        btnContact: "Nous contacter",
        statsYears: "ans d'expérience",
        statsPartners: "partenaires internationaux",
        statsImports: "tonnes D'importation des produits alimentaires",
        statsExports: "tonnes/an d'exportations de poisson frais",
        aboutTag: "À propos de nous",
        aboutTitle: "Un acteur stratégique en Mauritanie",
        aboutText: "SMTS Group est un acteur stratégique en Mauritanie, spécialisé dans le commerce général, les services aux entreprises et la facilitation des investissements. Nous connectons les opportunités locales aux investisseurs internationaux à travers une expertise pointue.",
        aboutBtn: "Découvrir le groupe",
        polesTag: "Nos pôles d'activité",
        polesTitle: "Des expertises complémentaires prêtes à l'emploi",
        polesBtn: "Découvrir toutes les expertises",
        allExpBtn: "Découvrir toutes les expertises",
        hqTitle: "SMTS Group — HQ",
        hqCity: "Nouakchott",
        whyTag: "Pourquoi choisir SMTS Group",
        whyTitle: "Un partenaire engagé sur la durée",
        polesArr: [
          {
            title: "Logistique & Transport",
            desc: "Chaîne logistique intégrée pour vos flux régionaux et internationaux."
          },
          {
            title: "Commerce Général",
            desc: "Approvisionnement, import-export et distribution structurée."
          },
          {
            title: "Facilitation d'Investissement",
            desc: "Accompagnement des investisseurs et structuration de projets."
          },
          {
            title: "Solutions Business",
            desc: "Représentation, médiation et conseil orienté résultats."
          }
        ],
        whyArr: [
          {
            title: "Expertise terrain en Mauritanie",
            text: "Une connaissance fine des acteurs, des procédures et des enjeux locaux."
          },
          {
            title: "Réseau institutionnel solide",
            text: "Relations de confiance avec les partenaires publics et privés."
          },
          {
            title: "Accompagnement de A à Z",
            text: "De la veille à l’opérationnel, une chaîne de valeur unifiée."
          },
          {
            title: "Approche personnalisée",
            text: "Des équipes dédiées et une réactivité adaptée à chaque dossier."
          }
        ]
      },
      groupe: {
        tag: "À propos de SMTS Group",
        title1: "Une entreprise mauritanienne de ",
        title2: "référence",
        subtitle: "SMTS Group est une entreprise mauritanienne de référence opérant dans plusieurs secteurs stratégiques. Notre mission est de faciliter les opérations commerciales et d'investissement en offrant des solutions fiables, rapides et adaptées au marché local.",
        visionKey: "Vision",
        missionKey: "Mission",
        valuesKey: "Valeurs",
        vision: "Devenir le partenaire incontournable pour tout projet d'investissement en Mauritanie.",
        mission: "Accompagner les entreprises et investisseurs en leur offrant des solutions complètes et sécurisées.",
        values: "Intégrité, excellence, engagement, innovation.",
        quote: "Chez SMTS Group, nous croyons fermement au potentiel économique de la Mauritanie. Notre ambition est de créer des ponts solides entre les investisseurs internationaux et les opportunités locales.",
        quoteAuthor: "Mot du Président",
        pilierTag: "Nos piliers économiques",
        pilierTitle: "Nos filiales",
        filiales: {
            logTitle: "Logistique & Transport",
            logText: "Solutions complètes de transport, stockage, distribution et consignation des navires de commerce.",
            impTitle: "Import/Export",
            impText: "Import/export et commercialisation de produits alimentaires (sucre, lait...).",
            solTitle: "Solutions Business",
            solText: "Accompagnement stratégique, représentation commerciale et conseil.",
            poiTitle: "Poissons frais",
            poiText: "Exportation de poissons frais."
        }
      },
      expertises: {
        tag: "Savoir-faire",
        title1: "Nos ",
        title2: "expertises",
        subtitle: "Des équipes dédiées pour structurer vos opérations en Mauritanie, de la représentation à la logistique opérationnelle.",
        blocks: {
          repTitle: "Représentation commerciale",
          repText: "Nous représentons vos intérêts en Mauritanie et développons votre réseau local.",
          medTitle: "Médiation d'affaires",
          medText: "Facilitation des négociations et sécurisation des partenariats.",
          logTitle: "Logistique & Transport",
          logText: "Chaîne logistique bout en bout pour sécuriser vos flux.",
          logList: ["Fret international", "Gestion des stocks", "Distribution locale"],
          douTitle: "Déclarant en douane",
          douText: "Gestion complète des formalités douanières pour un dédouanement rapide et sécurisé.",
          comTitle: "Commerce de denrées alimentaires",
          comText: "Importation et distribution de produits alimentaires essentiels.",
          comList: ["Légumes", "Huiles", "Sucre", "Lait (poudre et UHT)"]
        }
      },
      investir: {
        tag: "Opportunités de croissance",
        title1: "Pourquoi investir en ",
        title2: "Mauritanie ?",
        subtitle: "La Mauritanie offre un environnement riche en ressources naturelles et en opportunités économiques. SMTS Group agit comme passerelle stratégique entre investisseurs et décideurs locaux.",
        secTag: "Secteurs clés",
        secSub: "Une terre d'opportunités pour le développement continental",
        secteurs: {
          gasTitle: "Gaz",
          gasText: "Un secteur en pleine croissance avec des projets internationaux majeurs.",
          minTitle: "Mines (Or & Fer)",
          minText: "La Mauritanie est l'un des principaux producteurs de ressources minières en Afrique.",
          fishTitle: "Pêche",
          fishText: "Un des secteurs les plus dynamiques grâce à des ressources maritimes abondantes.",
          telTitle: "Télécommunications",
          telText: "Un marché en expansion avec une forte demande en innovation."
        },
        roleTitle: "Notre rôle stratégique",
        roleSub: "SMTS Group agit comme une passerelle stratégique entre investisseurs et décideurs locaux. Nous facilitons chacune de ces étapes décisives :",
        steps: {
          s1Title: "Démarches administratives",
          s1Text: "Structuration des dossiers et coordination avec les administrations concernées.",
          s2Title: "Mises en relation institutionnelles",
          s2Text: "Accès ciblé aux décideurs et partenaires clés sur le territoire.",
          s3Title: "Lancement opérationnel",
          s3Text: "Accompagnement jusqu'à la mise en service et le pilotage des premières phases."
        },
        btn: "Lancer votre projet maintenant"
      },
      contact: {
        tag: "Contact",
        title1: "Échangeons sur ",
        title2: "votre projet",
        subtitle: "Notre équipe répond dans les meilleurs délais pour structurer vos opérations en Mauritanie.",
        visualCaption: "Construisons ensemble des partenariats durables, fondés sur la confiance et l'excellence opérationnelle.",
        loc: "Localisation",
        dir: "Direction Générale",
        com: "Contact Commercial",
        dirLabel: "Directeur général",
        comLabel: "Directeur commercial",
        formTitle: "Formulaire de contact",
        labels: {
          nom: "Nom complet",
          email: "Email",
          tel: "Téléphone",
          sujet: "Sujet",
          msg: "Message"
        },
        errors: {
          nom: "Le nom est obligatoire",
          email: "L'email est obligatoire",
          emailInv: "Email invalide",
          sujet: "Le sujet est obligatoire",
          msg: "Le message est obligatoire"
        },
        btnSend: "Envoyer le message",
        btnSendAlt: "Envoyer la demande",
        sending: "Envoi en cours...",
        sendingAlt: "Transmission...",
        apiError: "L'envoi a échoué. Réessayez dans quelques instants.",
        success: "Message envoyé avec succès. Notre équipe vous recontacte très prochainement.",
        partTitle: "Vous êtes investisseur ou entreprise ?",
        partSub: "Contactez-nous pour explorer les opportunités en Mauritanie. Décrivez votre secteur d'intérêt et vos objectifs : nous vous proposons un échange personnalisé.",
        btnPartOpen: "Demande de partenariat",
        btnPartClose: "Fermer le formulaire de partenariat",
        partSujet: "Sujet du projet",
        partMsg: "Détails de l'investissement"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        accueil: "الرئيسية",
        groupe: "المجموعة",
        investir: "الاستثمار في موريتانيا",
        expertises: "خبراتنا",
        galerie: "المعرض",
        contact: "اتصل بنا"
      },
      galerie: {
        seoTitle: "المعرض",
        seoDescription: "أسماك طازجة ومجمدة، سكر، خضروات، زيوت نباتية وحليب بودرة — مجموعة SMTS.",
        tag: "المنتجات والتصدير",
        title1: "معرض ",
        title2: "المنتجات",
        subtitle: "اكتشفوا مجموعاتنا من المنتجات الغذائية وحلول التصدير نحو الأسواق الدولية.",
        sections: {
          poissons: {
            title: "أسماك طازجة ومجمدة",
            headline: "حلول تصدير مخصصة",
            paragraphs: [
              "نصدر الأسماك الطازجة والمجمدة وفق احتياجات شركائنا الدوليين نحو أوروبا وآسيا وأفريقيا",
              "نرافق المستثمرين والمشترين المحترفين في التوريد واقتناء المنتجات من السوق المحلي بخدمة موثوقة وشفافة ومتوافقة مع معايير التجارة الدولية"
            ]
          },
          sucre: {
            title: "سكر أبيض مكرر",
            headline: "نقاء برازيلي، جودة دولية",
            paragraphs: [
              "نستورد سكراً أبيض مكرراً برازيلياً عالي الجودة، معروفاً بنقائه وامتثاله للمعايير الدولية",
              "بفضل توريد موثوق ومنتظم، نلبي احتياجات السوق المحلي ومتطلبات الشركاء التجاريين الإقليميين"
            ]
          },
          legumes: {
            title: "بصل أصفر وبطاطس",
            headline: "استيراد متميز، توزيع إقليمي",
            paragraphs: [
              "نستورد كميات كبيرة من البصل الأصفر والبطاطس عالية الجودة من هولندا وبلجيكا ومصر لتزويد السوق المحلي وتلبية الأسواق الإقليمية عبر إعادة التصدير إلى الدول المجاورة"
            ]
          },
          huiles: {
            title: "زيوت نباتية",
            headline: "تميز ماليزي، نقاء دولي",
            paragraphs: [
              "نستورد زيوتاً نباتية عالية الجودة من ماليزيا، معروفة بنقائها واستقرارها وقيمتها الغذائية. تُختار بعناية وفق المعايير الدولية لتلبية احتياجات السوق المحلي ومتطلبات المهنيين وصناعة الأغذية"
            ]
          },
          lait: {
            title: "حليب بودرة",
            headline: "جودة دولية، توريد موثوق",
            paragraphs: [
              "نستورد حليباً بودرة عالي الجودة معبأً في أكياس 25 كغ، مختاراً من منتجين دوليين معترف بهم",
              "بفضل سلسلة توريد موثوقة وفعالة، نساهم في تلبية احتياجات السوق الموريتاني مع دعم التدفقات التجارية نحو أسواق الدول المجاورة",
              "التزامنا يقوم على الجودة وانتظام التوريد ورضا شركائنا على المدى الطويل"
            ]
          }
        }
      },
      footer: {
        intro: "فاعل استراتيجي في موريتانيا: التجارة، اللوجستيات، وتسهيل الاستثمار للشركات والمستثمرين الدوليين.",
        quick: "روابط سريعة",
        coord: "معلومات الاتصال",
        rights: "جميع الحقوق محفوظة.",
        loc: "نواكشوط، موريتانيا"
      },
      accueil: {
        heroTitle1: "نبني مستقبل استثماراتك ",
        heroTitle2: "في موريتانيا",
        heroSubtitle: "ترافق مجموعة SMTS المستثمرين والشركات بتقديم حلول متكاملة في التجارة واللوجستيات وتسهيل الأعمال.",
        btnExpertises: "اكتشف خبراتنا",
        btnContact: "اتصل بنا",
        statsYears: "سنوات من الخبرة",
        statsPartners: "شريك دولي",
        statsImports: "طن من استيراد المنتجات الغذائية",
        statsExports: "طن/سنويا من تصدير الأسماك الطازجة",
        aboutTag: "معلومات عنا",
        aboutTitle: "فاعل استراتيجي في موريتانيا",
        aboutText: "مجموعة SMTS هي فاعل استراتيجي في موريتانيا، متخصصة في التجارة العامة وخدمات الشركات وتسهيل الاستثمارات. نربط الفرص المحلية بالمستثمرين الدوليين.",
        aboutBtn: "اكتشف المجموعة",
        polesTag: "مجالات أنشطتنا",
        polesTitle: "خبرات متكاملة جاهزة للاستخدام",
        polesBtn: "اكتشف جميع الخبرات",
        allExpBtn: "اكتشف جميع الخبرات",
        hqTitle: "المقر الرئيسي لمجموعة SMTS",
        hqCity: "نواكشوط",
        whyTag: "لماذا تختار مجموعة SMTS",
        whyTitle: "شريك ملتزم على المدى الطويل",
        polesArr: [
          {
            title: "اللوجستيات والنقل",
            desc: "سلسلة لوجستية متكاملة لتدفقاتك الإقليمية والدولية."
          },
          {
            title: "التجارة العامة",
            desc: "التوريد، الاستيراد والتصدير والتوزيع المنظم."
          },
          {
            title: "تسهيل الاستثمار",
            desc: "مرافقة المستثمرين وهيكلة المشاريع."
          },
          {
            title: "حلول الأعمال",
            desc: "التمثيل، الوساطة، والاستشارات الموجهة نحو النتائج."
          }
        ],
        whyArr: [
          {
            title: "خبرة ميدانية في موريتانيا",
            text: "معرفة دقيقة بالفاعلين والإجراءات والتحديات المحلية."
          },
          {
            title: "شبكة مؤسسية قوية",
            text: "علاقات ثقة مع الشركاء من القطاعين العام والخاص."
          },
          {
            title: "مرافقة متكاملة",
            text: "من الرصد إلى التنفيذ، سلسلة قيمة موحدة."
          },
          {
            title: "نهج مخصص",
            text: "فرق متخصصة واستجابة مكيفة لكل ملف."
          }
        ]
      },
      groupe: {
        tag: "حول مجموعة SMTS",
        title1: "شركة موريتانية ",
        title2: "رائدة",
        subtitle: "مجموعة SMTS هي شركة موريتانية رائدة تعمل في عدة قطاعات استراتيجية. مهمتنا هي تسهيل العمليات التجارية والاستثمارية من خلال تقديم حلول موثوقة وسريعة ومكيفة مع السوق المحلي.",
        visionKey: "الرؤية",
        missionKey: "المهمة",
        valuesKey: "القيم",
        vision: "أن نصبح الشريك الذي لا غنى عنه لأي مشروع استثماري في موريتانيا.",
        mission: "مرافقة الشركات والمستثمرين من خلال تقديم حلول متكاملة وآمنة.",
        values: "النزاهة، التميز، الالتزام، الابتكار.",
        quote: "في مجموعة SMTS، نؤمن بشدة بالإمكانات الاقتصادية لموريتانيا. طموحنا هو بناء جسور متينة بين المستثمرين الدوليين والفرص المحلية.",
        quoteAuthor: "كلمة الرئيس",
        pilierTag: "ركائزنا الاقتصادية",
        pilierTitle: "فروعنا",
        filiales: {
            logTitle: "اللوجستيات والنقل",
            logText: "حلول كاملة للنقل والتخزين والتوزيع.",
            impTitle: "الاستيراد / التصدير",
            impText: "استيراد وتصدير وتسويق المنتجات الغذائية (السكر، الحليب...).",
            solTitle: "حلول الأعمال",
            solText: "المرافقة الاستراتيجية والتمثيل التجاري والاستشارات.",
            poiTitle: "الأسماك الطازجة",
            poiText: "تصدير الأسماك الطازجة."
        }
      },
      expertises: {
        tag: "خبراتنا المتميزة",
        title1: "مجالات ",
        title2: "خبرتنا",
        subtitle: "فرق متخصصة لهيكلة عملياتك في موريتانيا، من التمثيل التجاري إلى اللوجستيات التشغيلية.",
        blocks: {
          repTitle: "التمثيل التجاري",
          repText: "نحن نمثل مصالحك في موريتانيا ونطور شبكتك المحلية.",
          medTitle: "الوساطة التجارية",
          medText: "تسهيل المفاوضات وتأمين الشراكات.",
          logTitle: "اللوجستيات والنقل",
          logText: "سلسلة لوجستية متكاملة لتأمين تدفقاتك.",
          logList: ["الشحن الدولي", "إدارة المخزون", "التوزيع المحلي"],
          douTitle: "التخليص الجمركي",
          douText: "الإدارة الكاملة للإجراءات الجمركية لتخليص سريع وآمن.",
          comTitle: "تجارة المواد الغذائية",
          comText: "استيراد وتوزيع المنتجات الغذائية الأساسية.",
          comList: ["الخضروات", "الزيوت", "السكر", "الحليب"]
        }
      },
      investir: {
        tag: "فرص النمو",
        title1: "لماذا الاستثمار في ",
        title2: "موريتانيا ؟",
        subtitle: "توفر موريتانيا بيئة غنية بالموارد الطبيعية والفرص الاقتصادية. تعمل مجموعة SMTS كجسر استراتيجي بين المستثمرين وصناع القرار المحليين.",
        secTag: "القطاعات الرئيسية",
        secSub: "أرض الفرص للتنمية القارية",
        secteurs: {
          gasTitle: "الغاز",
          gasText: "قطاع سريع النمو مع مشاريع دولية كبرى.",
          minTitle: "المعادن (الذهب والحديد)",
          minText: "موريتانيا هي واحدة من المنتجين الرئيسيين للموارد المعدنية في أفريقيا.",
          fishTitle: "الصيد",
          fishText: "أحد القطاعات الأكثر ديناميكية بفضل الموارد البحرية الوفيرة.",
          telTitle: "الاتصالات",
          telText: "سوق متوسع مع طلب قوي على الابتكار."
        },
        roleTitle: "دورنا الاستراتيجي",
        roleSub: "تعمل مجموعة SMTS كجسر استراتيجي بين المستثمرين وصناع القرار المحليين. نسهل كل مرحلة من هذه المراحل الحاسمة:",
        steps: {
          s1Title: "الإجراءات الإدارية",
          s1Text: "هيكلة الملفات والتنسيق مع الإدارات المعنية.",
          s2Title: "التواصل المؤسسي",
          s2Text: "الوصول المستهدف إلى صناع القرار والشركاء الرئيسيين.",
          s3Title: "الإطلاق التشغيلي",
          s3Text: "المرافقة حتى التشغيل والتوجيه في المراحل الأولى."
        },
        btn: "ابدأ مشروعك الآن"
      },
      contact: {
        tag: "اتصل بنا",
        title1: "لنتحدث عن ",
        title2: "مشروعك",
        subtitle: "يرد فريقنا في أقرب وقت ممكن لهيكلة عملياتك في موريتانيا.",
        visualCaption: "لنبني معاً شراكات مستدامة قائمة على الثقة والتميز التشغيلي.",
        loc: "الموقع",
        dir: "الإدارة العامة",
        com: "الاتصال التجاري",
        dirLabel: "المدير العام",
        comLabel: "المدير التجاري",
        formTitle: "نموذج الاتصال",
        labels: {
          nom: "الاسم الكامل",
          email: "البريد الإلكتروني",
          tel: "الهاتف",
          sujet: "الموضوع",
          msg: "الرسالة"
        },
        errors: {
          nom: "الاسم مطلوب",
          email: "البريد الإلكتروني مطلوب",
          emailInv: "بريد إلكتروني غير صالح",
          sujet: "الموضوع مطلوب",
          msg: "الرسالة مطلوبة"
        },
        btnSend: "إرسال الرسالة",
        btnSendAlt: "إرسال الطلب",
        sending: "جاري الإرسال...",
        sendingAlt: "جاري الإرسال...",
        apiError: "فشل الإرسال. حاول مرة أخرى في غضون لحظات.",
        success: "تم إرسال الرسالة بنجاح. سيتصل بك فريقنا قريباً.",
        partTitle: "هل أنت مستثمر أو شركة؟",
        partSub: "اتصل بنا لاستكشاف الفرص في موريتانيا. قم بوصف قطاع اهتمامك وأهدافك: سنقدم لك تبادلاً مخصصاً.",
        btnPartOpen: "طلب شراكة",
        btnPartClose: "إغلاق نموذج الشراكة",
        partSujet: "موضوع المشروع",
        partMsg: "تفاصيل الاستثمار"
      }
    }
  },
  en: {
    translation: {
      nav: {
        accueil: "Home",
        groupe: "The Group",
        investir: "Invest in Mauritania",
        expertises: "Our Expertise",
        galerie: "Gallery",
        contact: "Contact"
      },
      galerie: {
        seoTitle: "Gallery",
        seoDescription: "Fresh and frozen fish, sugar, vegetables, vegetable oils, and powdered milk — SMTS Group.",
        tag: "Products & export",
        title1: "Our ",
        title2: "Gallery",
        subtitle: "Discover our food product ranges and export solutions for international markets.",
        sections: {
          poissons: {
            title: "Fresh & Frozen Fish",
            headline: "Tailored Export Solutions",
            paragraphs: [
              "We export fresh and frozen fish according to the specific needs of our international partners to Europe, Asia, and Africa",
              "We also support investors and professional buyers in sourcing and acquiring products from the local market, with reliable, transparent service aligned with international trade standards"
            ]
          },
          sucre: {
            title: "Refined White Sugar",
            headline: "Brazilian Purity, International Quality",
            paragraphs: [
              "We import high-quality Brazilian refined white sugar, recognized for its purity and compliance with international standards",
              "Through reliable, regular supply, we meet local market needs and the requirements of regional commercial partners"
            ]
          },
          legumes: {
            title: "Yellow Onions & Potatoes",
            headline: "Premium Import, Regional Distribution",
            paragraphs: [
              "We import substantial quantities of high-quality yellow onions and potatoes from the Netherlands, Belgium, and Egypt to supply the local market and regional markets through re-export to neighboring countries"
            ]
          },
          huiles: {
            title: "Vegetable Oils",
            headline: "Malaysian Excellence, International Purity",
            paragraphs: [
              "We import high-quality vegetable oils from Malaysia, valued for their purity, stability, and nutritional excellence. Carefully selected to international standards, they meet local market needs and the requirements of professionals and the food industry"
            ]
          },
          lait: {
            title: "Powdered Milk",
            headline: "International Quality, Reliable Supply",
            paragraphs: [
              "We import high-quality powdered milk packaged in 25 kg bags, selected from recognized international producers",
              "Through a reliable and efficient supply chain, we help meet the needs of the Mauritanian market while supporting commercial flows to neighboring countries",
              "Our commitment is built on quality, regular supply, and lasting satisfaction for our partners"
            ]
          }
        }
      },
      footer: {
        intro: "A strategic player in Mauritania: trade, logistics, and investment facilitation for international companies and investors.",
        quick: "Quick Links",
        coord: "Contact Details",
        rights: "All rights reserved.",
        loc: "Nouakchott, Mauritania"
      },
      accueil: {
        heroTitle1: "Building the future of your investments ",
        heroTitle2: "in Mauritania",
        heroSubtitle: "SMTS Group supports investors and companies with integrated solutions in trade, logistics, and business facilitation across the entire value chain.",
        btnExpertises: "Discover our expertise",
        btnContact: "Contact us",
        statsYears: "years of experience",
        statsPartners: "international partners",
        statsImports: "tons of food products imported",
        statsExports: "tons/year of fresh fish exports",
        aboutTag: "About Us",
        aboutTitle: "A strategic player in Mauritania",
        aboutText: "SMTS Group is a strategic player in Mauritania, specializing in general trade, business services, and investment facilitation. We connect local opportunities to international investors through expert knowledge.",
        aboutBtn: "Discover the group",
        polesTag: "Our business areas",
        polesTitle: "Complementary expertise ready for use",
        polesBtn: "Discover all expertise",
        allExpBtn: "Discover all expertise",
        hqTitle: "SMTS Group — HQ",
        hqCity: "Nouakchott",
        whyTag: "Why choose SMTS Group",
        whyTitle: "A long-term committed partner",
        polesArr: [
          {
            title: "Logistics & Transport",
            desc: "Integrated supply chain for your regional and international flows."
          },
          {
            title: "General Trade",
            desc: "Sourcing, import-export, and structured distribution."
          },
          {
            title: "Investment Facilitation",
            desc: "Supporting investors and project structuring."
          },
          {
            title: "Business Solutions",
            desc: "Representation, mediation, and results-oriented consulting."
          }
        ],
        whyArr: [
          {
            title: "Local field expertise in Mauritania",
            text: "Deep knowledge of stakeholders, procedures, and local challenges."
          },
          {
            title: "Strong institutional network",
            text: "Relationships of trust with public and private partners."
          },
          {
            title: "A to Z Support",
            text: "From monitoring to operational, a unified value chain."
          },
          {
            title: "Personalized approach",
            text: "Dedicated teams and responsiveness tailored to each case."
          }
        ]
      },
      groupe: {
        tag: "About SMTS Group",
        title1: "A leading Mauritanian ",
        title2: "enterprise",
        subtitle: "SMTS Group is a leading Mauritanian company operating in several strategic sectors. Our mission is to facilitate commercial and investment operations by offering reliable, fast, and adapted solutions to the local market.",
        visionKey: "Vision",
        missionKey: "Mission",
        valuesKey: "Values",
        vision: "To become the essential partner for any investment project in Mauritania.",
        mission: "To support companies and investors by offering comprehensive and secure solutions.",
        values: "Integrity, excellence, commitment, innovation.",
        quote: "At SMTS Group, we firmly believe in the economic potential of Mauritania. Our ambition is to create strong bridges between international investors and local opportunities.",
        quoteAuthor: "Message from the President",
        pilierTag: "Our economic pillars",
        pilierTitle: "Our subsidiaries",
        filiales: {
            logTitle: "Logistics & Transport",
            logText: "Complete solutions for transport, storage, distribution, and commercial ship consignment.",
            impTitle: "Import/Export",
            impText: "Import/export and marketing of food products (sugar, milk...).",
            solTitle: "Business Solutions",
            solText: "Strategic support, commercial representation, and consulting.",
            poiTitle: "Fresh Fish",
            poiText: "Export of fresh fish."
        }
      },
      expertises: {
        tag: "Know-how",
        title1: "Our ",
        title2: "expertise",
        subtitle: "Dedicated teams to structure your operations in Mauritania, from representation to operational logistics.",
        blocks: {
          repTitle: "Commercial Representation",
          repText: "We represent your interests in Mauritania and develop your local network.",
          medTitle: "Business Mediation",
          medText: "Facilitating negotiations and securing partnerships.",
          logTitle: "Logistics & Transport",
          logText: "End-to-end supply chain to secure your flows.",
          logList: ["International freight", "Inventory management", "Local distribution"],
          douTitle: "Customs Broker",
          douText: "Complete management of customs formalities for fast and secure clearance.",
          comTitle: "Food Trade",
          comText: "Importation and distribution of essential food products.",
          comList: ["Vegetables", "Oils", "Sugar", "Milk (powder and UHT)"]
        }
      },
      investir: {
        tag: "Growth Opportunities",
        title1: "Why invest in ",
        title2: "Mauritania?",
        subtitle: "Mauritania offers an environment rich in natural resources and economic opportunities. SMTS Group acts as a strategic bridge between investors and local decision-makers.",
        secTag: "Key Sectors",
        secSub: "A land of opportunities for continental development",
        secteurs: {
          gasTitle: "Gas",
          gasText: "A rapidly growing sector with major international projects.",
          minTitle: "Mining (Gold & Iron)",
          minText: "Mauritania is one of the leading producers of mineral resources in Africa.",
          fishTitle: "Fishing",
          fishText: "One of the most dynamic sectors thanks to abundant maritime resources.",
          telTitle: "Telecommunications",
          telText: "An expanding market with high demand for innovation."
        },
        roleTitle: "Our Strategic Role",
        roleSub: "SMTS Group acts as a strategic bridge between investors and local decision-makers. We facilitate each of these decisive steps:",
        steps: {
          s1Title: "Administrative Procedures",
          s1Text: "Structuring files and coordination with relevant administrations.",
          s2Title: "Institutional Connections",
          s2Text: "Targeted access to key decision-makers and partners in the territory.",
          s3Title: "Operational Launch",
          s3Text: "Support until commissioning and management of the first phases."
        },
        btn: "Launch your project now"
      },
      contact: {
        tag: "Contact",
        title1: "Let's discuss ",
        title2: "your project",
        subtitle: "Our team responds as quickly as possible to structure your operations in Mauritania.",
        visualCaption: "Let's build lasting partnerships founded on trust and operational excellence.",
        loc: "Location",
        dir: "General Management",
        com: "Commercial Contact",
        dirLabel: "Managing Director",
        comLabel: "Commercial Director",
        formTitle: "Contact Form",
        labels: {
          nom: "Full Name",
          email: "Email",
          tel: "Phone",
          sujet: "Subject",
          msg: "Message"
        },
        errors: {
          nom: "Name is required",
          email: "Email is required",
          emailInv: "Invalid email",
          sujet: "Subject is required",
          msg: "Message is required"
        },
        btnSend: "Send Message",
        btnSendAlt: "Send Request",
        sending: "Sending...",
        sendingAlt: "Transmitting...",
        apiError: "Sending failed. Please try again in a few moments.",
        success: "Message sent successfully. Our team will contact you shortly.",
        partTitle: "Are you an investor or a company?",
        partSub: "Contact us to explore opportunities in Mauritania. Describe your sector of interest and goals: we offer a personalized exchange.",
        btnPartOpen: "Partnership Request",
        btnPartClose: "Close partnership form",
        partSujet: "Project Subject",
        partMsg: "Investment Details"
      }
    }
  },
  es: {
    translation: {
      nav: {
        accueil: "Inicio",
        groupe: "El Grupo",
        investir: "Invertir en Mauritania",
        expertises: "Nuestra Experiencia",
        galerie: "Galería",
        contact: "Contacto"
      },
      galerie: {
        seoTitle: "Galería",
        seoDescription: "Pescado fresco y congelado, azúcar, verduras, aceites vegetales y leche en polvo — SMTS Group.",
        tag: "Productos y exportación",
        title1: "Nuestra ",
        title2: "Galería",
        subtitle: "Descubra nuestras gamas de productos alimentarios y soluciones de exportación hacia los mercados internacionales.",
        sections: {
          poissons: {
            title: "Pescado Fresco y Congelado",
            headline: "Soluciones de Exportación a Medida",
            paragraphs: [
              "Exportamos pescado fresco y congelado según las necesidades específicas de nuestros socios internacionales hacia Europa, Asia y África",
              "También acompañamos a inversores y compradores profesionales en el abastecimiento y la adquisición de productos del mercado local, con un servicio fiable, transparente y conforme a los estándares del comercio internacional"
            ]
          },
          sucre: {
            title: "Azúcar Blanco Refinado",
            headline: "Pureza Brasileña, Calidad Internacional",
            paragraphs: [
              "Importamos azúcar blanco refinado brasileño de alta calidad, reconocido por su pureza y conformidad con los estándares internacionales",
              "Gracias a un suministro fiable y regular, respondemos a las necesidades del mercado local y a las exigencias de los socios comerciales regionales"
            ]
          },
          legumes: {
            title: "Cebollas Amarillas y Patatas",
            headline: "Importación Premium, Distribución Regional",
            paragraphs: [
              "Importamos importantes cantidades de cebollas amarillas y patatas de alta calidad de Países Bajos, Bélgica y Egipto para abastecer el mercado local y los mercados regionales mediante la reexportación a países vecinos"
            ]
          },
          huiles: {
            title: "Aceites Vegetales",
            headline: "Excelencia Malasia, Pureza Internacional",
            paragraphs: [
              "Importamos aceites vegetales de alta calidad de Malasia, reconocidos por su pureza, estabilidad y excelencia nutricional. Seleccionados según los estándares internacionales, satisfacen las necesidades del mercado local y las exigencias de los profesionales y la industria alimentaria"
            ]
          },
          lait: {
            title: "Leche en Polvo",
            headline: "Calidad Internacional, Suministro Fiable",
            paragraphs: [
              "Importamos leche en polvo de alta calidad en sacos de 25 kg, seleccionada entre productores internacionales reconocidos",
              "Gracias a una cadena de suministro fiable y eficiente, contribuimos a satisfacer las necesidades del mercado mauritano y acompañamos los flujos comerciales hacia los mercados de los países vecinos",
              "Nuestro compromiso se basa en la calidad, la regularidad de los suministros y la satisfacción duradera de nuestros socios"
            ]
          }
        }
      },
      footer: {
        intro: "Un actor estratégico en Mauritania: comercio, logística y facilitación de inversiones para empresas e inversores internacionales.",
        quick: "Enlaces rápidos",
        coord: "Datos de contacto",
        rights: "Todos los derechos reservados.",
        loc: "Nuakchot, Mauritania"
      },
      accueil: {
        heroTitle1: "Construyendo el futuro de sus inversiones ",
        heroTitle2: "en Mauritania",
        heroSubtitle: "SMTS Group acompaña a inversores y empresas con soluciones integradas en comercio, logística y facilitación de negocios en toda la cadena de valor.",
        btnExpertises: "Descubra nuestra experiencia",
        btnContact: "Contactar con nosotros",
        statsYears: "años de experiencia",
        statsPartners: "socios internacionales",
        statsImports: "toneladas de importación de productos alimenticios",
        statsExports: "toneladas/año de exportaciones de pescado fresco",
        aboutTag: "Sobre Nosotros",
        aboutTitle: "Un actor estratégico en Mauritania",
        aboutText: "SMTS Group es un actor estratégico en Mauritania, especializado en comercio general, servicios empresariales y facilitación de inversiones. Conectamos las oportunidades locales con los inversores internacionales a través de un conocimiento experto.",
        aboutBtn: "Descubra el grupo",
        polesTag: "Nuestras áreas de negocio",
        polesTitle: "Experiencia complementaria lista para usar",
        polesBtn: "Descubra toda la experiencia",
        allExpBtn: "Descubra toda la experiencia",
        hqTitle: "SMTS Group — HQ",
        hqCity: "Nuakchot",
        whyTag: "¿Por qué elegir SMTS Group?",
        whyTitle: "Un socio comprometido a largo plazo",
        polesArr: [
          {
            title: "Logística y Transporte",
            desc: "Cadena de suministro integrada para sus flujos regionales e internacionales."
          },
          {
            title: "Comercio General",
            desc: "Abastecimiento, importación-exportación y distribución estructurada."
          },
          {
            title: "Facilitación de Inversiones",
            desc: "Apoyo a los inversores y estructuración de proyectos."
          },
          {
            title: "Soluciones de Negocio",
            desc: "Representación, mediación y consultoría orientada a resultados."
          }
        ],
        whyArr: [
          {
            title: "Experiencia de campo local en Mauritania",
            text: "Conocimiento profundo de los actores, procedimientos y desafíos locales."
          },
          {
            title: "Sólida red institucional",
            text: "Relaciones de confianza con socios públicos y privados."
          },
          {
            title: "Acompañamiento de la A a la Z",
            text: "Desde el seguimiento hasta el nivel operativo, una cadena de valor unificada."
          },
          {
            title: "Enfoque personalizado",
            text: "Equipos dedicados y capacidad de respuesta adaptada a cada caso."
          }
        ]
      },
      groupe: {
        tag: "Sobre SMTS Group",
        title1: "Una empresa mauritana de ",
        title2: "referencia",
        subtitle: "SMTS Group es una empresa mauritana de referencia que opera en varios sectores estratégicos. Nuestra misión es facilitar las operaciones comerciales y de inversión ofreciendo soluciones fiables, rápidas y adaptadas al mercado local.",
        visionKey: "Visión",
        missionKey: "Misión",
        valuesKey: "Valores",
        vision: "Convertirse en el socio esencial para cualquier proyecto de inversión en Mauritania.",
        mission: "Acompañar a empresas e inversores ofreciendo soluciones integrales y seguras.",
        values: "Integridad, excelencia, compromiso, innovación.",
        quote: "En SMTS Group, creemos firmemente en el potencial económico de Mauritania. Nuestra ambición es crear puentes sólidos entre los inversores internacionales y las oportunidades locales.",
        quoteAuthor: "Mensaje del Presidente",
        pilierTag: "Nuestros pilares económicos",
        pilierTitle: "Nuestras filiales",
        filiales: {
            logTitle: "Logística y Transporte",
            logText: "Soluciones integrales de transporte, almacenamiento, distribución y consignación de buques comerciales.",
            impTitle: "Importación/Exportación",
            impText: "Importación/exportación y comercialización de productos alimenticios (azúcar, leche...).",
            solTitle: "Soluciones de Negocio",
            solText: "Apoyo estratégico, representación comercial y consultoría.",
            poiTitle: "Pescado fresco",
            poiText: "Exportación de pescado fresco."
        }
      },
      expertises: {
        tag: "Saber hacer",
        title1: "Nuestra ",
        title2: "experiencia",
        subtitle: "Equipos dedicados para estructurar sus operaciones en Mauritania, desde la representación hasta la logística operativa.",
        blocks: {
          repTitle: "Representación Comercial",
          repText: "Representamos sus intereses en Mauritania y desarrollamos su red local.",
          medTitle: "Mediación de Negocio",
          medText: "Facilitación de negociaciones y aseguramiento de asociaciones.",
          logTitle: "Logística y Transporte",
          logText: "Cadena de suministro de extremo a extremo para asegurar sus flujos.",
          logList: ["Flete internacional", "Gestión de inventarios", "Distribución local"],
          douTitle: "Agente de Aduanas",
          douText: "Gestión integral de las formalidades aduaneras para un despacho rápido y seguro.",
          comTitle: "Comercio de Alimentos",
          comText: "Importación y distribución de productos alimenticios esenciales.",
          comList: ["Verduras", "Aceites", "Azúcar", "Leche (polvo y UHT)"]
        }
      },
      investir: {
        tag: "Oportunidades de Crecimiento",
        title1: "¿Por qué invertir en ",
        title2: "Mauritania?",
        subtitle: "Mauritania ofrece un entorno rico en recursos naturales y oportunidades económicas. SMTS Group actúa como un puente estratégico entre los inversores y los responsables locales de la toma de decisiones.",
        secTag: "Sectores Clave",
        secSub: "Una tierra de oportunidades para el desarrollo continental",
        secteurs: {
          gasTitle: "Gas",
          gasText: "Un sector en rápido crecimiento con importantes proyectos internacionales.",
          minTitle: "Minería (Oro y Hierro)",
          minText: "Mauritania es uno de los principales productores de recursos minerales en África.",
          fishTitle: "Pesca",
          fishText: "Uno de los sectores más dinámicos gracias a los abundantes recursos marítimos.",
          telTitle: "Telecomunicaciones",
          telText: "Un mercado en expansión con una gran demanda de innovación."
        },
        roleTitle: "Nuestro Papel Estratégico",
        roleSub: "SMTS Group actúa como un puente estratégico entre los inversores y los responsables locales de la toma de decisiones. Facilitamos cada uno de estos pasos decisivos:",
        steps: {
          s1Title: "Trámites Administrativos",
          s1Text: "Estructuración de expedientes y coordinación con las administraciones correspondientes.",
          s2Title: "Conexiones Institucionales",
          s2Text: "Acceso específico a los responsables clave de la toma de decisiones y socios en el territorio.",
          s3Title: "Lanzamiento Operativo",
          s3Text: "Apoyo hasta la puesta en marcha y gestión de las primeras fases."
        },
        btn: "Inicie su proyecto ahora"
      },
      contact: {
        tag: "Contacto",
        title1: "Hablemos de ",
        title2: "su proyecto",
        subtitle: "Nuestro equipo responde lo antes posible para estructurar sus operaciones en Mauritania.",
        visualCaption: "Construyamos juntos alianzas duraderas basadas en la confianza y la excelencia operativa.",
        loc: "Ubicación",
        dir: "Dirección General",
        com: "Contacto Comercial",
        dirLabel: "Director General",
        comLabel: "Director Comercial",
        formTitle: "Formulario de Contacto",
        labels: {
          nom: "Nombre completo",
          email: "Correo electrónico",
          tel: "Teléfono",
          sujet: "Asunto",
          msg: "Mensaje"
        },
        errors: {
          nom: "El nombre es obligatorio",
          email: "El correo electrónico es obligatorio",
          emailInv: "Correo electrónico inválido",
          sujet: "El asunto es obligatorio",
          msg: "El mensaje es obligatorio"
        },
        btnSend: "Enviar mensaje",
        btnSendAlt: "Enviar solicitud",
        sending: "Enviando...",
        sendingAlt: "Transmitiendo...",
        apiError: "El envío falló. Inténtelo de nuevo en unos momentos.",
        success: "Mensaje enviado con éxito. Nuestro equipo se pondrá en contacto con usted en breve.",
        partTitle: "¿Es usted inversor o empresa?",
        partSub: "Póngase en contacto con nosotros para explorar oportunidades en Mauritania. Describa su sector de interés y sus objetivos: le ofrecemos un intercambio personalizado.",
        btnPartOpen: "Solicitud de Asociación",
        btnPartClose: "Cerrar formulario de asociación",
        partSujet: "Asunto del proyecto",
        partMsg: "Detalles de la inversión"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
