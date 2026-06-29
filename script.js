// ============================================================
//  MOBILE MENU FUNCTIONS
// ============================================================

const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
}

document.addEventListener("click", (event) => {
    if (mobileMenu && navLinks) {
        if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("open");
        }
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks) navLinks.classList.remove("active");
        if (mobileMenu) mobileMenu.classList.remove("open");
    });
});

// ============================================================
//  SLIDESHOW FUNCTIONALITY
// ============================================================

let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
    }
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    setInterval(autoSlide, 5000);
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
});

// ============================================================
//  RFQ FUNCTIONS
// ============================================================

function startCountdown() {
    const deadline = new Date(2026, 5, 13, 17, 0, 0);
    function updateCountdown() {
        const now = new Date();
        const diff = deadline - now;
        if (diff <= 0) {
            const els = ['days', 'hours', 'minutes', 'seconds'];
            els.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = '00';
            });
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');
        if (d) d.innerHTML = days.toString().padStart(2, '0');
        if (h) h.innerHTML = hours.toString().padStart(2, '0');
        if (m) m.innerHTML = minutes.toString().padStart(2, '0');
        if (s) s.innerHTML = seconds.toString().padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function setupCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const email = 'jdpcaritasjs@yahoo.com';
            navigator.clipboard.writeText(email).then(function() {
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.innerHTML = '✅ Copied! ' + email;
                document.body.appendChild(toast);
                setTimeout(function() { toast.remove(); }, 2000);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupCopyEmail();
});

// ============================================================
//  JOB DEADLINE SYSTEM
// ============================================================

// Set deadline: 2nd July 2026, 4:00 PM
const JOB_DEADLINE = new Date(2026, 6, 2, 16, 0, 0);

function isJobDeadlinePassed() {
    const now = new Date();
    return now > JOB_DEADLINE;
}

function getTimeRemaining() {
    const now = new Date();
    const diff = JOB_DEADLINE - now;
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, expired: false };
}

function updateDeadlineDisplay() {
    const timerEl = document.getElementById('mainDeadlineTimer');
    if (!timerEl) return;
    
    const time = getTimeRemaining();
    if (time.expired) {
        timerEl.innerHTML = '⏰ Applications Closed ❌';
        timerEl.style.color = '#e94560';
        timerEl.style.background = 'rgba(233, 69, 96, 0.2)';
    } else {
        timerEl.innerHTML = `⏰ ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s remaining`;
        timerEl.style.color = '#ffffff';
        timerEl.style.background = 'rgba(255,255,255,0.2)';
    }
}

// Update timer every second
setInterval(updateDeadlineDisplay, 1000);

// ============================================================
//  JOB ADVERTISEMENT DATA — All 15 Positions
// ============================================================

const jobAdData = [
    // ===== SENIOR MANAGEMENT =====
    {
        id: '01',
        title: 'Project Manager - Humanitarian Response',
        loe: 100,
        category: 'management health',
        discipline: 'Social Work / Development Studies / Public Health',
        experience: "Master's + 3-5 years",
        reportTo: 'Program Coordinator / Country Representative',
        priority: 1,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Project Manager to lead a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical and managerial leadership to ensure the project is implemented effectively, efficiently, and in accordance with donor requirements and organisational policies.',
        responsibilities: [
            'Develop and implement a comprehensive project plan, including work plans, budgets, and timelines.',
            'Manage project resources, including personnel, finances, and equipment. Ensure project activities are implemented on time, within budget, and to a high standard.',
            'Provide technical guidance and support to project staff and partners on humanitarian response, public health, and crisis management.',
            'Ensure project activities are aligned with national and international standards, including Sphere and WHO guidelines.',
            'Build and maintain relationships with government authorities, UN agencies, NGOs, and other stakeholders.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Develop and implement a monitoring and evaluation plan to track project progress and impact.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Identify and mitigate project risks, including security, operational, and reputational risks.',
            'Lead and manage a team of project staff, including coordinators, officers, and enumerators. Ensure staff are trained, supported, and performing their roles effectively.'
        ],
        requirements: [
            'Minimum of a Master\'s degree in Public Health, International Development, or a related field.',
            'Minimum 3-5 years of experience in project management, preferably in humanitarian response or public health.',
            'Strong technical knowledge of humanitarian response, public health, and crisis management.',
            'Excellent leadership, management, and communication skills.',
            'Ability to work in a fast-paced environment and adapt to changing circumstances.',
            'Fluency in English, with a good command of Hausa an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian contexts, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including CRS, USAID, ECHO, and UN agencies.'
        ]
    },
    {
        id: '02',
        title: 'Senior Project Officer - Nutrition + MAM',
        loe: 100,
        category: 'health',
        discipline: 'Nutrition and Health',
        experience: "Bachelor's (Master's pref) + 3-5 years",
        reportTo: 'Project Manager / Nutrition Coordinator',
        priority: 2,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Senior Project Officer - Nutrition + MAM to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure the effective implementation of nutrition and MAM (Moderate Acute Malnutrition) interventions.',
        responsibilities: [
            'Provide technical guidance and support to project staff and partners on nutrition and MAM interventions, including CMAM (Community-Based Management of Acute Malnutrition) and IFC (Infant and Young Child Feeding).',
            'Develop and implement nutrition and MAM project plans, including protocols and guidelines.',
            'Support project planning, budgeting, and implementation, ensuring timely and quality delivery of project activities.',
            'Manage project resources, including personnel, finances, and equipment.',
            'Build and maintain relationships with government authorities, UN agencies, NGOs, and other stakeholders on nutrition and MAM issues.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Support monitoring and reporting on nutrition and MAM project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Support the capacity building of project staff and partners on nutrition and MAM concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Nutrition, Public Health, or a related field (Master\'s degree preferred).',
            'Minimum 3-5 years of experience in nutrition and MAM programming, preferably in humanitarian response or development projects.',
            'Strong technical knowledge of nutrition and MAM interventions, including CMAM and IFC.',
            'Excellent leadership, management, and communication skills.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, and UN agencies.',
            'Certification in nutrition or MAM programming (e.g., ENN, UNICEF).'
        ]
    },
    {
        id: '03',
        title: 'MEAL Officer (x2 positions)',
        loe: 100,
        category: 'health',
        discipline: 'Monitoring, Evaluation, Accountability & Learning',
        experience: "Bachelor's + 2-3 years",
        reportTo: 'Project Manager / MEAL Coordinator',
        priority: 3,
        summary: 'JDPC Jos is seeking 2 highly motivated and experienced MEAL Officers to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidates will provide technical assistance in MEAL activities, ensuring data quality, and promoting a culture of accountability and learning within the project.',
        responsibilities: [
            'Support the development and implementation of MEAL plans, including data collection tools and reporting templates.',
            'Collect, analyse, and report project data, ensuring accuracy and timeliness.',
            'Provide regular MEAL updates to the project team and stakeholders.',
            'Conduct regular monitoring visits to project sites, tracking progress and identifying areas for improvement.',
            'Support the evaluation of project activities, including baseline, mid-term, and end-line assessments.',
            'Promote a culture of accountability within the project, ensuring beneficiaries are involved in decision-making processes.',
            'Support the development and implementation of feedback and complaints mechanisms.',
            'Identify lessons learned and best practices, sharing these with the project team and stakeholders.',
            'Support the capacity building of project staff and partners on MEAL concepts and tools.',
            'Provide technical assistance to project staff on data collection, analysis, and reporting.'
        ],
        requirements: [
            'Bachelor\'s degree in a relevant field (e.g., statistics, data science, public health, or social sciences).',
            'Minimum 2-3 years of experience in MEAL roles, preferably in humanitarian response or development projects.',
            'Strong analytical and problem-solving skills, with experience in data management and analysis.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including CRS, USAID, ECHO, and UN agencies.',
            'Proficiency in data analysis software (e.g., SPSS, R, or STATA).'
        ]
    },
    {
        id: '04',
        title: 'MAMI Officer',
        loe: 100,
        category: 'health',
        discipline: 'Maternal and Newborn Health',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / Health Coordinator',
        priority: 4,
        summary: 'JDPC Jos is seeking a highly motivated and experienced MAMI Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure effective implementation of MAMI interventions, focusing on at-risk mothers and infants.',
        responsibilities: [
            'Provide technical guidance and support to project staff and partners on MAMI interventions, including identification, referral, and management of at-risk mothers and infants.',
            'Develop and implement MAMI project plans, including protocols and guidelines.',
            'Support the implementation of MAMI activities, including training of health workers, community outreach, and facility-based care.',
            'Ensure integration of MAMI services with existing health systems and community structures.',
            'Support monitoring and reporting on MAMI project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Build and maintain relationships with government authorities, UN agencies, NGOs, and other stakeholders on MAMI issues.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Support the capacity building of project staff, partners, and Community Mobilisers on MAMI concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Nursing, Midwifery, Public Health, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in maternal and newborn health programming, preferably in humanitarian response or development projects.',
            'Strong technical knowledge of MAMI interventions, including identification and management of at-risk mothers and infants.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including CRS, USAID, ECHO, and UN agencies.',
            'Certification in MAMI or related training (e.g., ENN, UNICEF, WHO).'
        ]
    },
    {
        id: '05',
        title: 'MYCN-E Officer',
        loe: 100,
        category: 'health',
        discipline: 'Maternal, Newborn, and Child Health',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / Health Coordinator',
        priority: 5,
        summary: 'JDPC Jos is seeking a highly motivated and experienced MYCN-E Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure the effective implementation of MYCN-E interventions, with a focus on emergency contexts.',
        responsibilities: [
            'Provide technical guidance and support to project staff and partners on MYCN-E interventions, including emergency nutrition, maternal and newborn care, and child health services.',
            'Develop and implement MYCN-E project plans, including protocols and guidelines.',
            'Support the implementation of MYCN-E activities, including service delivery, training of health workers, and community outreach.',
            'Ensure integration of MYCN-E services with existing health systems and community structures.',
            'Support monitoring and reporting on MYCN-E project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Build and maintain relationships with government authorities, UN agencies, NGOs, and other stakeholders on MYCN-E issues.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Support the capacity building of project staff, partners and Community Mobilisers on MYCN-E concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Nutrition, Paediatrics, Public Health, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in MYCN-E programming, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of MYCN-E interventions, including emergency nutrition, maternal and newborn care, and child health services.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, CRS and UN agencies.',
            'Certification in MYCN-E or related training (e.g., ENN, UNICEF, WHO).'
        ]
    },
    {
        id: '06',
        title: 'Food Assistance Project Officer',
        loe: 100,
        category: 'health',
        discipline: 'Food Security and Livelihoods',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / Senior Food Assistance Project Officer',
        priority: 6,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Food Assistance Project Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure the effective implementation of food assistance interventions.',
        responsibilities: [
            'Support the design and implementation of food assistance interventions, including food distributions, cash/voucher transfers, and nutrition-sensitive programming.',
            'Ensure food assistance activities are aligned with national and international standards.',
            'Support needs assessments and targeting exercises to identify vulnerable populations.',
            'Ensure transparent and accountable targeting and registration processes.',
            'Support food distribution planning, logistics, and implementation.',
            'Ensure food commodities are handled and stored safely.',
            'Support monitoring and reporting on food assistance project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Build relationships with government authorities, UN agencies, NGOs, and other stakeholders on food assistance issues.',
            'Represent the organisation in meetings, workshops, and conferences.'
        ],
        requirements: [
            'Bachelor\'s degree in Food Science, Nutrition, Agriculture, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in food assistance programming, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of food assistance modalities, including food distributions and cash/voucher transfers.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, WFP, and UN agencies.',
            'Certification in food security or nutrition programming.'
        ]
    },
    {
        id: '07',
        title: 'Shelter and WASH Project Officer',
        loe: 100,
        category: 'wash',
        discipline: 'Shelter and WASH',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / WASH Coordinator',
        priority: 7,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Shelter and WASH Project Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure the effective implementation of shelter and WASH interventions.',
        responsibilities: [
            'Provide technical guidance and support to project staff and partners on shelter and WASH interventions, including emergency shelter, WASH infrastructure, and hygiene promotion.',
            'Develop and implement shelter and WASH project plans, including protocols and guidelines.',
            'Support the implementation of Shelter and WASH activities, including site planning, construction, and maintenance of WASH facilities.',
            'Ensure integration of shelter and WASH services with existing community structures.',
            'Support monitoring and reporting on shelter and WASH project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Build and maintain relationships with government authorities, UN agencies, NGOs, and other stakeholders on shelter and WASH issues.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Support the capacity building of project staff, partners and Community Mobilisers on shelter and WASH concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Engineering, Environmental Health, Public Health, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in shelter and WASH programming, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of shelter and WASH interventions, including emergency shelter, WASH infrastructure, and hygiene promotion.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, CRS and UN agencies.',
            'Certification in WASH or shelter programming (e.g., Sphere, UNHCR).'
        ]
    },
    {
        id: '08',
        title: 'Hygiene Officer',
        loe: 100,
        category: 'wash',
        discipline: 'WASH (Water, Sanitation, and Hygiene)',
        experience: "Bachelor's + 2-3 years",
        reportTo: 'Project Manager / WASH Coordinator',
        priority: 8,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Hygiene Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to promote hygiene practices and prevent disease outbreaks in emergency settings.',
        responsibilities: [
            'Develop and implement hygiene promotion strategies, including community outreach, education, and awareness campaigns.',
            'Support the distribution of hygiene kits and promote their use among affected populations.',
            'Support the installation and maintenance of handwashing facilities, latrines, and other WASH infrastructure.',
            'Ensure WASH facilities are designed and constructed with dignity, safety, and accessibility in mind.',
            'Build relationships with community leaders, health workers, Community Mobilisers, and other stakeholders to promote hygiene practices.',
            'Support the establishment and training of hygiene promotion teams.',
            'Support monitoring and reporting on hygiene project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Support the capacity building of the project, Community Mobilisers, staff and partners on hygiene concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Public Health, Environmental Health, or a related field.',
            'Minimum 2-3 years of experience in hygiene promotion, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of hygiene practices, including handwashing, sanitation, and disease prevention.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, and UN agencies.',
            'Certification in WASH or hygiene programming (e.g., Sphere, UNICEF).'
        ]
    },
    {
        id: '09',
        title: 'Project Officer - Protection',
        loe: 100,
        category: 'protection',
        discipline: 'Protection and Human Rights',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / Senior Protection Officer',
        priority: 9,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Project Officer – Protection to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and start-up protection interventions, ensuring the safety and dignity of affected populations.',
        responsibilities: [
            'Support the design and implementation of protection interventions, including GBV prevention and response, child protection, and protection monitoring.',
            'Ensure protection activities are aligned with national and international standards (e.g., Protection Principles, Sphere).',
            'Support the establishment and maintenance of safe and confidential case management and referral systems.',
            'Ensure timely and quality response to protection concerns and incidents.',
            'Build relationships with government authorities, UN agencies, NGOs, and other stakeholders on protection issues.',
            'Represent the organisation in meetings, workshops, and conferences.',
            'Support monitoring and reporting on protection project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Support the capacity building of project staff, partners, and communities on protection concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Social Work, Psychology, Law, Human Rights, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in protection programming, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of protection principles, including GBV, child protection, and protection monitoring.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, and UN agencies.',
            'Certification in protection or related training (e.g., PSEA, GBV, Child Protection).'
        ]
    },
    {
        id: '10',
        title: 'DRR Project Officer',
        loe: 100,
        category: 'management',
        discipline: 'Disaster Risk Reduction and Management',
        experience: "Bachelor's (Master's pref) + 2-3 years",
        reportTo: 'Project Manager / DRR Coordinator',
        priority: 10,
        summary: 'JDPC Jos is seeking a highly motivated and experienced DRR Project Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide technical leadership and management support to ensure the effective implementation of DRR interventions.',
        responsibilities: [
            'Support the design and implementation of DRR interventions, including risk assessments, community-based DRR, and early warning systems.',
            'Ensure DRR activities are aligned with national and international frameworks (e.g., Sendai Framework).',
            'Build relationships with communities, government authorities, Community Mobilisers, and other stakeholders to promote DRR and resilience building.',
            'Support community-led DRR initiatives and capacity strengthening.',
            'Support risk assessments and analysis to inform project planning and response.',
            'Contribute to contingency planning and preparedness activities.',
            'Support monitoring and reporting on DRR project activities, including data collection and analysis.',
            'Prepare regular reports, including donor reports, and ensure data quality and accuracy.',
            'Support the capacity building of project staff, partners, Community Mobilisers, and communities on DRR concepts and tools.'
        ],
        requirements: [
            'Bachelor\'s degree in Disaster Management, Environmental Science, Development Studies, or a related field (Master\'s degree preferred).',
            'Minimum 2-3 years of experience in DRR programming, preferably in humanitarian response or emergency contexts.',
            'Strong technical knowledge of DRR principles, including risk assessment, community-based DRR, and early warning systems.',
            'Excellent communication and interpersonal skills, with the ability to work with diverse stakeholders.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including CRS, USAID, ECHO, and UN agencies.',
            'Certification in DRR or related training (e.g., UNDRR, IFRC).'
        ]
    },
    {
        id: '11',
        title: 'Finance Officer',
        loe: 100,
        category: 'admin',
        discipline: 'Finance and Accounting',
        experience: "Bachelor's + 2-3 years",
        reportTo: 'Project Manager / Finance Manager',
        priority: 11,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Finance Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide financial management and accounting support, ensuring compliance with donor regulations and organisational policies.',
        responsibilities: [
            'Support the development and management of project budgets, ensuring accurate and timely financial reporting.',
            'Process payments, invoices, and transactions, adhering to organisational policies and procedures.',
            'Maintain accurate and up-to-date financial records, including accounting ledgers and journals.',
            'Ensure compliance with donor regulations, including USAID, ECHO, and UN agencies.',
            'Prepare and submit financial reports, including budget variance reports and expenditure forecasts.',
            'Support audits and financial reviews, ensuring timely resolution of audit findings.',
            'Manage project cash flow, including forecasting and liquidity management.',
            'Support the disbursement of funds to project partners and vendors.',
            'Provide procurement support, ensuring compliance with organisational policies and procedures.',
            'Maintain accurate records of procurement activities, including contracts and agreements.'
        ],
        requirements: [
            'Bachelor\'s degree in Accounting, Finance, or a related field.',
            'Minimum 2-3 years of experience in finance and accounting roles, preferably in humanitarian response or development projects.',
            'Strong knowledge of accounting principles and practices, including financial reporting and budgeting.',
            'Excellent analytical and problem-solving skills, with attention to detail and accuracy.',
            'Proficiency in accounting software (e.g., QuickBooks, Excel) and Microsoft Office.',
            'Fluency in English, with a good command of Hausa an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises, including sudden-onset disasters and protracted crises.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, and UN agencies.',
            'Professional certification (e.g., ACCA, ICAN).'
        ]
    },
    {
        id: '12',
        title: 'Procurement Officer',
        loe: 100,
        category: 'admin',
        discipline: 'Procurement and Logistics',
        experience: "Bachelor's + 2-3 years",
        reportTo: 'Project Manager / Finance Officer',
        priority: 12,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Procurement Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide procurement support to ensure the timely and efficient acquisition of goods and services for project activities.',
        responsibilities: [
            'Support the procurement of goods, services, and works for project activities.',
            'Ensure procurement processes are transparent, competitive, and compliant with donor and organisational procurement policy.',
            'Identify and manage vendors and suppliers.',
            'Support contract negotiations and ensure compliance with contract terms.',
            'Support the development and implementation of procurement plans.',
            'Ensure timely procurement to meet project needs.',
            'Maintain accurate procurement records and documentation.',
            'Support reporting on procurement activities as needed.',
            'Ensure procurement activities comply with organisational policies and donor requirements.'
        ],
        requirements: [
            'Bachelor\'s degree in Procurement, Supply Chain Management, Business Administration, or a related field.',
            'Minimum 2-3 years of experience in procurement roles, preferably in humanitarian or emergency contexts.',
            'Knowledge of procurement principles, practices, and regulations.',
            'Good communication and interpersonal skills.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises or emergency contexts.',
            'Knowledge of the Nigerian context and procurement regulations.',
            'Experience with donor-funded projects, including CRS, USAID, ECHO, and UN agencies.',
            'Certification in procurement (e.g., CIPS).'
        ]
    },
    {
        id: '13',
        title: 'Communication Officer',
        loe: 50,
        category: 'admin',
        discipline: 'Communications / Journalism / Media Studies',
        experience: "Bachelor's + 2-3 years",
        reportTo: 'Project Manager / Communications Coordinator',
        priority: 13,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Communication Officer to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide communication support to ensure effective information sharing and visibility of project activities.',
        responsibilities: [
            'Support the development and implementation of a communication strategy for the project.',
            'Ensure consistent messaging and branding across all communication channels.',
            'Develop and disseminate communication materials, including press releases, social media posts, and project reports.',
            'Support the production of multimedia content (e.g., photos, videos).',
            'Build relationships with local and national media outlets.',
            'Support media outreach and press conferences as needed.',
            'Support the collection, analysis, and dissemination of project data and information.',
            'Ensure accurate and timely reporting on project activities.',
            'Support project visibility activities, including events and community outreach.'
        ],
        requirements: [
            'Bachelor\'s degree in Communications, Journalism, Media Studies, or a related field.',
            'Minimum 2-3 years of experience in communication roles, preferably in humanitarian response or development contexts.',
            'Strong writing, editing, and communication skills.',
            'Experience with social media and digital communication tools.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises or emergency contexts.',
            'Knowledge of the Nigerian context and humanitarian architecture.',
            'Experience with donor-funded projects, including USAID, ECHO, and UN agencies.'
        ]
    },
    {
        id: '14',
        title: 'Security Assistant',
        loe: 75,
        category: 'admin',
        discipline: 'Security and Safety',
        experience: 'Diploma/Certificate + 2 years',
        reportTo: 'Security Officer / Project Manager',
        priority: 14,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Security Assistant to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide security support to ensure the safety and security of project staff, assets, and activities.',
        responsibilities: [
            'Support the implementation of security protocols and procedures.',
            'Assist in conducting security assessments and monitoring security situations.',
            'Support the coordination of access and movement of project staff and assets.',
            'Ensure security clearances and approvals are in place for project activities.',
            'Support the reporting of security incidents and ensure timely response.',
            'Assist in the investigation of security incidents as needed.',
            'Support security awareness and training activities for project staff.',
            'Promote a culture of security among project teams.',
            'Support administrative tasks related to security management (e.g., permits, licenses).'
        ],
        requirements: [
            'Diploma or certificate in Security Management, Criminology, or a related field.',
            'Minimum 2 years of experience in security roles, preferably in humanitarian or emergency contexts.',
            'Knowledge of security principles and practices in crisis environments.',
            'Good communication and interpersonal skills.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises or emergency contexts.',
            'Knowledge of the Nigerian context and security dynamics.',
            'Experience with donor-funded projects or NGOs.'
        ]
    },
    {
        id: '15',
        title: 'Admin Assistant',
        loe: 50,
        category: 'admin',
        discipline: 'Administration and Logistics',
        experience: 'Diploma/Certificate + 2 years',
        reportTo: 'Project Manager / Admin Coordinator',
        priority: 15,
        summary: 'JDPC Jos is seeking a highly motivated and experienced Admin Assistant to support a rapid start-up 12-month project aimed at reducing crisis-related morbidity and mortality among populations affected by sudden-onset disasters and protracted humanitarian crises. The successful candidate will provide administrative support to ensure smooth project operations.',
        responsibilities: [
            'Support day-to-day administrative tasks, including filing, data entry, and correspondence.',
            'Assist in preparing reports, documents, and presentations.',
            'Support travel arrangements for project staff and visitors.',
            'Assist in coordinating logistics for project activities and events.',
            'Support office management tasks, including supplies and equipment management.',
            'Ensure office facilities are maintained and secure.',
            'Support internal and external communication as needed.',
            'Assist in maintaining project records and databases.',
            'Support other administrative tasks as required by the project.'
        ],
        requirements: [
            'Diploma or certificate in Business Administration, Office Management, or a related field.',
            'Minimum 2 years of experience in administrative roles, preferably in humanitarian or emergency contexts.',
            'Good organisational and communication skills.',
            'Proficiency in MS Office and administrative software.',
            'Fluency in English, with a good command of Hausa, is an added advantage.'
        ],
        desirable: [
            'Experience working in humanitarian crises or emergency contexts.',
            'Knowledge of the Nigerian context and administrative procedures.',
            'Experience with donor-funded projects or NGOs.'
        ]
    }
];

// ============================================================
//  RENDER JOBS WITH DEADLINE CHECK
// ============================================================

function renderJobAdCards() {
    const grid = document.getElementById('jobsAdGrid');
    if (!grid) return;

    const sortedJobs = [...jobAdData].sort((a, b) => a.priority - b.priority);
    const isClosed = isJobDeadlinePassed();

    grid.innerHTML = '';

    sortedJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'jobs-ad-card';

        const loeClass = job.loe === 100 ? 'loe-full' : 'loe-part';

        let actionsHTML = `
            <div class="job-actions">
                <button class="job-btn job-btn-view" onclick="openJobAdModal('${job.id}')">👁️ View</button>
        `;

        if (isClosed) {
            actionsHTML += `
                <button class="job-btn job-btn-closed" disabled>🔒 Closed</button>
            `;
        } else {
            actionsHTML += `
                <button class="job-btn job-btn-apply" onclick="openJobAdModal('${job.id}')">📩 Apply Now</button>
            `;
        }
        actionsHTML += `</div>`;

        card.innerHTML = `
            <div class="job-title">
                ${job.id}. ${job.title}
                <span class="job-id">(${job.id})</span>
            </div>
            <div class="job-meta">
                <span>📍 Plateau State</span>
                <span class="${loeClass}">⏳ ${job.loe}% LOE</span>
                <span>🎓 ${job.experience}</span>
            </div>
            <div class="job-discipline">📌 ${job.discipline}</div>
            ${actionsHTML}
        `;

        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON' && !isClosed) {
                openJobAdModal(job.id);
            }
        });

        grid.appendChild(card);
    });
}

// ============================================================
//  JOB MODAL WITH APPLICATION FORM & DEADLINE CHECK
// ============================================================

function openJobAdModal(jobId) {
    // Check if deadline passed
    if (isJobDeadlinePassed()) {
        const modal = document.getElementById('jobsAdModal');
        const body = document.getElementById('jobsAdModalBody');
        if (!modal || !body) return;
        
        body.innerHTML = `
            <div class="job-ad-detail" style="text-align:center; padding:40px 20px;">
                <div style="font-size:4rem; margin-bottom:20px;">🔒</div>
                <h2 style="color:#e94560;">Applications Closed</h2>
                <p style="font-size:1.1rem; color:#555; max-width:500px; margin:15px auto;">
                    The application deadline for this position has passed. 
                    Please check back for future opportunities.
                </p>
                <div style="background:#f8f9fa; padding:15px; border-radius:10px; margin:20px 0; display:inline-block;">
                    <p style="margin:0; color:#888;">
                        📅 Deadline was: <strong>2nd July 2026, 4:00 PM</strong>
                    </p>
                </div>
                <br>
                <button onclick="closeJobAdModal()" style="padding:12px 30px; background:#0a7304; color:#fff; border:none; border-radius:30px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif;">
                    ← Back to Jobs
                </button>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    // Normal job display
    const job = jobAdData.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('jobsAdModal');
    const body = document.getElementById('jobsAdModalBody');
    if (!modal || !body) return;

    const loeClass = job.loe === 100 ? 'loe-badge' : 'loe-part';
    const time = getTimeRemaining();

    body.innerHTML = `
        <div class="job-ad-detail">
            <span class="job-id-badge">Position ${job.id}</span>
            <h2>${job.title}</h2>
            <p class="subtitle">📌 ${job.discipline}</p>

            <div style="background:#e8f5e9; padding:10px 15px; border-radius:8px; margin-bottom:15px; border:1px solid #c8e6c9; text-align:center;">
                ⏰ <strong>Time Remaining:</strong> ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s
                <br><small style="color:#666;">Deadline: 2nd July 2026, 4:00 PM</small>
            </div>

            <div class="meta-grid">
                <div class="meta-item">
                    <span class="meta-label">📍 Location</span>
                    <span class="meta-value">Plateau State, Nigeria</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">⏳ LOE</span>
                    <span class="meta-value"><span class="${loeClass}">${job.loe}%</span></span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">🎓 Experience</span>
                    <span class="meta-value">${job.experience}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">📋 Reports to</span>
                    <span class="meta-value">${job.reportTo}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">📅 Duration</span>
                    <span class="meta-value">12 months</span>
                </div>
            </div>

            <div class="section">
                <h3>📋 Job Summary</h3>
                <p>${job.summary}</p>
            </div>

            <div class="section">
                <h3>🎯 Key Responsibilities</h3>
                <ul>
                    ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>

            <div class="section">
                <h3>✅ Requirements</h3>
                <ul>
                    ${job.requirements.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>

            <div class="section">
                <h3>⭐ Desirable Qualifications</h3>
                <ul>
                    ${job.desirable.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>

            <div class="apply-section">
                <h3>📧 Apply for ${job.title}</h3>
                <p style="font-size:0.9rem; color:#555; text-align:center; margin-bottom:15px;">
                    Fill in the form below and upload your documents.
                </p>

                <form id="jobApplicationForm" enctype="multipart/form-data">
                    <input type="hidden" name="job_id" value="${job.id}">
                    <input type="hidden" name="job_title" value="${job.title}">

                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="full_name" required placeholder="e.g., John Doe">
                    </div>

                    <div class="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" required placeholder="e.g., john@example.com">
                    </div>

                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="e.g., 08012345678">
                    </div>

                    <div class="form-group">
                        <label>Cover Letter / Message</label>
                        <textarea name="cover_letter" rows="4" placeholder="Tell us why you're the right candidate...">I am applying for the position of ${job.title} (Position ${job.id}).</textarea>
                    </div>

                    <div class="form-group">
                        <label>Upload CV (PDF, DOC, DOCX) *</label>
                        <input type="file" name="cv" accept=".pdf,.doc,.docx" required>
                        <div class="file-hint">Accepted: PDF, DOC, DOCX (Max 5MB)</div>
                    </div>

                    <div class="form-group">
                        <label>Upload 1-Page Proposal (PDF, DOC, DOCX) *</label>
                        <input type="file" name="proposal" accept=".pdf,.doc,.docx" required>
                        <div class="file-hint">Accepted: PDF, DOC, DOCX (Max 5MB)</div>
                    </div>

                    <div id="jobFormResponse" style="margin-bottom:12px; display:none;"></div>

                    <button type="submit" class="btn-submit" id="jobSubmitBtn">📤 Submit Application</button>

                    <p style="font-size:0.8rem; color:#999; margin-top:10px; text-align:center;">
                        ⏰ Deadline: <strong style="color:#e94560;">2nd July 2026, 4:00 PM</strong>
                    </p>
                </form>

                <div style="margin-top:15px; padding-top:15px; border-top:1px solid #e0e0e0; text-align:center;">
                    <p style="font-size:0.85rem; color:#888;">Or apply via email:</p>
                    <a href="mailto:jdpcaritasjs@yahoo.com?subject=Application%20for%20${encodeURIComponent(job.id + ' - ' + job.title)}&body=Dear%20Hiring%20Team%2C%0D%0A%0D%0AI%20am%20applying%20for%20the%20position%20of%20${encodeURIComponent(job.title)}%20(Position%20${job.id}).%0D%0A%0D%0APlease%20find%20attached%20my%20CV%2C%20cover%20letter%2C%20and%201-page%20proposal.%0D%0A%0D%0AThank%20you%20for%20considering%20my%20application.%0D%0A%0D%0ABest%20regards%2C%0D%0A[Your%20Full%20Name]" 
                       class="job-btn-apply-large" target="_blank">📩 Apply via Email</a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // AJAX Form Submission
    const form = document.getElementById('jobApplicationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Double-check deadline
            if (isJobDeadlinePassed()) {
                const responseDiv = document.getElementById('jobFormResponse');
                responseDiv.style.display = 'block';
                responseDiv.innerHTML = `
                    <div class="job-form-error">
                        ❌ Applications are now closed. This submission will not be accepted.
                    </div>
                `;
                return;
            }

            const submitBtn = document.getElementById('jobSubmitBtn');
            const responseDiv = document.getElementById('jobFormResponse');

            submitBtn.textContent = '⏳ Submitting...';
            submitBtn.disabled = true;
            responseDiv.style.display = 'none';

            const formData = new FormData(this);

            fetch('submit-job-application.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                responseDiv.style.display = 'block';
                if (data.success) {
                    responseDiv.innerHTML = `
                        <div class="job-form-success">
                            ✅ ${data.message}
                        </div>
                    `;
                    form.reset();
                    submitBtn.textContent = '✅ Submitted!';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        closeJobAdModal();
                        submitBtn.textContent = '📤 Submit Application';
                        submitBtn.style.background = '#e94560';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    responseDiv.innerHTML = `
                        <div class="job-form-error">
                            ❌ ${data.message}
                        </div>
                    `;
                    submitBtn.textContent = '📤 Submit Application';
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                responseDiv.style.display = 'block';
                responseDiv.innerHTML = `
                    <div class="job-form-error">
                        ❌ Network error. Please try again.
                    </div>
                `;
                submitBtn.textContent = '📤 Submit Application';
                submitBtn.disabled = false;
            });
        });
    }
}

function closeJobAdModal() {
    const modal = document.getElementById('jobsAdModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeJobAdModalOutside(e) {
    if (e.target === document.getElementById('jobsAdModal')) {
        closeJobAdModal();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeJobAdModal();
    }
});

// ============================================================
//  INIT - Auto-run when page loads
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    renderJobAdCards();
    updateDeadlineDisplay();
});