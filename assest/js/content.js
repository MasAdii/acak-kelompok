document.addEventListener('DOMContentLoaded', () => {
    const totalOrangInput = document.getElementById('totalOrang');
    const orangPerKelompokInput = document.getElementById('orangPerKelompok');
    const acakBtn = document.getElementById('acakKelompok');
    const hasilBox = document.getElementById('hasilBox');
    const hasilDiv = document.getElementById('hasil');
    const menuList = document.getElementById('menu-list');
    const navMenuButton = document.getElementById('nav-menu-button');
    const bagikanBox = document.getElementById('bagikanBox');
    const btnCopy = document.getElementById('btnCopy');
    const btnCopyText = btnCopy.querySelector('span');
    const btnWA = document.getElementById('btnWA');
    const copyrightYearSpan = document.getElementById('copyright-year');

    let generatedTextForSharing = '';

    if (navMenuButton && menuList) {
        navMenuButton.addEventListener('click', () => {
            const isExpanded = navMenuButton.getAttribute('aria-expanded') === 'true' || false;
            navMenuButton.setAttribute('aria-expanded', !isExpanded);
            menuList.classList.toggle('hidden');
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
    }

    if (acakBtn) {
        acakBtn.addEventListener('click', () => {
            const total = parseInt(totalOrangInput.value);
            const orangPerKelompok = parseInt(orangPerKelompokInput.value);

            hasilDiv.innerHTML = ''; 
            bagikanBox.classList.add('hidden');
            hasilBox.classList.add('hidden');
            generatedTextForSharing = ''; 

            if (isNaN(total) || isNaN(orangPerKelompok) || total < 1 || orangPerKelompok < 1) {
                hasilDiv.innerHTML = `<p style="color: var(--color-primary-dark, red); font-weight: 600; font-size: 1.1em;">Masukkan jumlah orang dan jumlah per kelompok dengan benar.</p>`;
                hasilBox.classList.remove('hidden');
                return;
            }
            
            if (orangPerKelompok > total) {
                hasilDiv.innerHTML = `<p style="color: var(--color-primary-dark, red); font-weight: 600; font-size: 1.1em;">Jumlah orang per kelompok tidak boleh melebihi total orang.</p>`;
                hasilBox.classList.remove('hidden');
                return;
            }


            const orangList = Array.from({ length: total }, (_, i) => `Nomor ${i + 1}`);
            shuffleArray(orangList);

            const kelompokArray = [];
            for (let i = 0; i < total; i += orangPerKelompok) {
                kelompokArray.push(orangList.slice(i, i + orangPerKelompok));
            }

            let htmlOutput = '';
            let textOutput = 'Hasil Pengacakan Kelompok AdiCak:\n\n';

            kelompokArray.forEach((kelompok, index) => {
                const timNumber = index + 1;
                htmlOutput += `<h2>Tim ${timNumber}</h2><ul>`;
                textOutput += `Tim ${timNumber}:\n`;

                kelompok.forEach(orang => {
                    htmlOutput += `<li>${orang}</li>`;
                    textOutput += `- ${orang}\n`;
                });

                htmlOutput += `</ul>`;
                textOutput += '\n';
            });

            hasilDiv.innerHTML = htmlOutput;
            generatedTextForSharing = textOutput.trim();
            hasilBox.classList.remove('hidden');

            if (kelompokArray.length > 0) {
                bagikanBox.classList.remove('hidden');
                btnWA.href = `https://wa.me/?text=${encodeURIComponent(generatedTextForSharing)}`;
            }
        });
    }

    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            if (!generatedTextForSharing) return;

            navigator.clipboard.writeText(generatedTextForSharing).then(() => {
                const originalText = btnCopyText.textContent;
                const originalIconClass = btnCopy.querySelector('i').className;
                
                btnCopy.querySelector('i').className = 'ph ph-check-circle'; 
                btnCopyText.textContent = 'Tersalin!';
                btnCopy.disabled = true;

                setTimeout(() => {
                    btnCopyText.textContent = originalText;
                    btnCopy.querySelector('i').className = originalIconClass; 
                    btnCopy.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin hasil: ', err);

                try {
                    const textArea = document.createElement("textarea");
                    textArea.value = generatedTextForSharing;
                    textArea.style.position = "fixed"; 
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    const originalText = btnCopyText.textContent;
                    btnCopyText.textContent = 'Tersalin! (Fallback)';
                    btnCopy.disabled = true;
                    setTimeout(() => {
                        btnCopyText.textContent = originalText;
                        btnCopy.disabled = false;
                    }, 2000);

                } catch (fallbackErr) {
                    alert('Gagal menyalin hasil. Silakan salin secara manual.');
                    console.error('Fallback copy gagal: ', fallbackErr);
                }
            });
        });
    }

    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }
});