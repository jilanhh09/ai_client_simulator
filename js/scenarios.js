
const clientScenarios = {

    // ========================================
    // 1. KLIEN RAMAH (PEMULA)
    // ========================================

    friendly: {
        name: "Klien Ramah",
        description: "Klien yang ramah, terbuka, dan mudah diajak berdiskusi.",
        icon: "fa-face-smile",
        difficulty: "Pemula",
        color: "#7655D9",

        scenarios: [

            {
                id: "introduction",
                name: "Pertemuan dan Perkenalan Pertama",

                objective: "Berlatih memperkenalkan diri, menjelaskan profil perusahaan, dan membangun hubungan baik dengan klien.",

                opening: "Halo! Senang sekali bisa bertemu dengan Anda. Sebelum kita mulai, bisakah Anda memperkenalkan diri dan menceritakan sedikit tentang perusahaan Anda?",

                responses: [
                    "Wah, menarik sekali! Bisa ceritakan lebih lanjut mengenai perusahaan Anda?",
                    "Saya mengerti. Apa keunggulan perusahaan Anda dibandingkan perusahaan lainnya?",
                    "Kedengarannya bagus. Apa langkah selanjutnya yang perlu kita lakukan?"
                ]
            },

            {
                id: "product",
                name: "Pengenalan Produk",

                objective: "Berlatih memperkenalkan produk, menjelaskan keunggulan, dan menyampaikan manfaat produk kepada calon pelanggan.",

                opening: "Halo! Saya tertarik dengan produk yang Anda tawarkan. Bisakah Anda menjelaskan produk tersebut dan apa keunggulannya?",

                responses: [
                    "Kedengarannya sangat bermanfaat. Bagaimana cara kerja produk tersebut?",
                    "Menarik sekali! Apa saja manfaat utama yang bisa saya dapatkan?",
                    "Terima kasih atas penjelasannya. Bisa saya tahu berapa harga produk tersebut?"
                ]
            },

            {
                id: "consultation",
                name: "Konsultasi dengan Klien",

                objective: "Berlatih memahami kebutuhan klien, mengidentifikasi permasalahan, dan memberikan solusi yang sesuai.",

                opening: "Halo! Saat ini saya sedang mencari solusi untuk mengembangkan bisnis saya. Apakah Anda bisa membantu menjelaskan layanan atau solusi yang perusahaan Anda tawarkan?",

                responses: [
                    "Itu saran yang bagus. Bisa dijelaskan lebih lanjut bagaimana solusi tersebut dapat membantu bisnis saya?",
                    "Saya mengerti. Apakah ada alternatif solusi lain yang bisa Anda rekomendasikan?",
                    "Terima kasih atas sarannya. Sepertinya solusi tersebut cukup sesuai dengan kebutuhan bisnis saya."
                ]
            }

        ]
    },


    // ========================================
    // 2. KLIEN SULIT (MENENGAH)
    // ========================================

    difficult: {
        name: "Klien Sulit",
        description: "Klien yang kritis, banyak bertanya, dan memiliki tuntutan tinggi.",
        icon: "fa-user-tie",
        difficulty: "Menengah",
        color: "#DF9250",

        scenarios: [

            {
                id: "complaint",
                name: "Menangani Keluhan Klien",

                objective: "Berlatih menghadapi keluhan, menunjukkan empati, memberikan penjelasan, dan menawarkan solusi secara profesional.",

                opening: "Sejujurnya, saya kurang puas dengan layanan yang saya terima. Hasilnya tidak sesuai dengan harapan saya. Apa yang akan Anda lakukan untuk mengatasi masalah ini?",

                responses: [
                    "Menurut saya, penjelasan tersebut masih belum cukup. Bagaimana Anda akan memperbaiki masalah ini?",
                    "Saya membutuhkan solusi yang jelas, bukan hanya permintaan maaf. Apa tindakan konkret yang bisa Anda berikan?",
                    "Bagaimana Anda memastikan bahwa masalah seperti ini tidak akan terulang kembali?"
                ]
            },

            {
                id: "objection",
                name: "Menghadapi Keberatan Harga",

                objective: "Berlatih menjelaskan nilai dan keunggulan produk, mempertahankan penawaran, serta melakukan negosiasi harga dengan klien.",

                opening: "Menurut saya, harga yang Anda tawarkan terlalu mahal dibandingkan dengan penyedia layanan lainnya. Mengapa saya harus memilih layanan Anda?",

                responses: [
                    "Perusahaan lain menawarkan harga yang lebih rendah. Apa yang membuat layanan Anda lebih unggul?",
                    "Apakah Anda bisa memberikan penawaran harga yang lebih baik?",
                    "Saya masih membutuhkan alasan yang lebih kuat sebelum memutuskan untuk menerima penawaran Anda."
                ]
            },

            {
                id: "problem",
                name: "Menyelesaikan Permasalahan Klien",

                objective: "Berlatih menganalisis permasalahan, menentukan prioritas, dan menyampaikan solusi yang efektif kepada klien.",

                opening: "Saat ini kita sedang menghadapi masalah serius terkait jadwal penyelesaian proyek. Bagaimana rencana Anda untuk mengatasi situasi ini?",

                responses: [
                    "Masalah ini terdengar cukup rumit. Apa solusi yang bisa segera Anda lakukan?",
                    "Berapa lama waktu yang dibutuhkan untuk menyelesaikan masalah tersebut?",
                    "Bagaimana jika solusi yang Anda usulkan ternyata tidak berhasil?"
                ]
            }

        ]
    },


    // ========================================
    // 3. KLIEN PROFESIONAL (MAHIR)
    // ========================================

    professional: {
        name: "Klien Profesional",
        description: "Klien formal, analitis, dan mengharapkan penjelasan yang terstruktur serta terperinci.",
        icon: "fa-briefcase",
        difficulty: "Mahir",
        color: "#548BCF",

        scenarios: [

            {
                id: "presentation",
                name: "Presentasi Bisnis",

                objective: "Berlatih menyampaikan presentasi bisnis secara terstruktur, profesional, dan meyakinkan.",

                opening: "Selamat pagi. Terima kasih telah hadir dalam pertemuan ini. Silakan jelaskan gambaran umum proposal yang Anda ajukan, termasuk tujuan dan hasil yang ingin dicapai.",

                responses: [
                    "Bisakah Anda memberikan penjelasan yang lebih terperinci mengenai hasil yang diharapkan?",
                    "Apa bukti atau data yang mendukung pendekatan yang Anda usulkan?",
                    "Bagaimana cara Anda mengukur keberhasilan proyek ini?"
                ]
            },

            {
                id: "negotiation",
                name: "Negosiasi Bisnis",

                objective: "Berlatih melakukan negosiasi bisnis secara profesional dan mencapai kesepakatan yang menguntungkan kedua belah pihak.",

                opening: "Terima kasih telah menghadiri pertemuan ini. Saya ingin membahas lebih lanjut mengenai syarat dan ketentuan kerja sama bisnis yang berpotensi kita jalankan.",

                responses: [
                    "Bisakah Anda menjelaskan lebih lanjut mengenai ketentuan dalam penawaran tersebut?",
                    "Sejauh mana fleksibilitas yang dapat Anda berikan dalam kesepakatan ini?",
                    "Bagaimana bentuk kerja sama ini dapat memberikan keuntungan bagi kedua belah pihak?"
                ]
            },

            {
                id: "proposal",
                name: "Diskusi Proposal Proyek",

                objective: "Berlatih menjelaskan proposal proyek, jadwal pelaksanaan, sumber daya, dan hasil akhir yang akan diberikan.",

                opening: "Saya sudah meninjau proposal proyek yang Anda ajukan. Bisakah Anda menjelaskan jadwal pelaksanaan serta hasil utama yang akan diberikan dalam proyek tersebut?",

                responses: [
                    "Sumber daya apa saja yang dibutuhkan untuk melaksanakan proyek ini?",
                    "Bagaimana strategi Anda dalam mengelola potensi risiko selama proyek berlangsung?",
                    "Bisakah Anda menjelaskan lebih terperinci mengenai hasil akhir yang diharapkan dari proyek ini?"
                ]
            }

        ]
    }

};
