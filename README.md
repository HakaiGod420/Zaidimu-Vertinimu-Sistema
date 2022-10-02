# Žaidimų vertimo sistema
 
 ## **1. Sprendžiamo uždavinio aprašymas**
### 1.1 Sistemos paskirtis
Projekto tikslas – leisti vartotojams įvertinti žaidimus ir taip pat stebėti įvertinimus, kitų 
žaidimų.
Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria 
naudosis žaidėjai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API).
Visą informaciją pildys administratorius. Administratorius galės papildyti žaidimų kūrėjų 
sąrašą ir žaidimų sąrašą. Taip pat administratorius galės trinti įvertinimus, jei jie bus nekorektiški. 
Svečiai galės prisiregistruoti prie sistemos ir prisijungti. Svečias galės matyti bendrą informaciją apie 
žaidimus ir jo bendrą įvertinimą. Prisijungęs vartotojas galės atlikti tokias pat funkcijas kaip ir svečias. 
Prisijungęs vartotojas galės įvertinti žaidimus t.y pažymėti kokį balą rašo žaidimui, bei parašyti trumpą 
komentarą.
### 1.2 Funkciniai reikalavimai

Sistema sudarys trys sistemos naudotojai: administratorius, prisijungęs vartotojas, svečias.

**Svečio funkcijos:**
1. Prisiregistruoti prie sistemos;
2. Prisijungti prie sistemos;
3. Peržiūrėti žaidimų kūrėjo sąrašą;
4. Peržiūrėti žaidimų sąrašą;
5. Matyti bendrą žaidimo informaciją ir įvertinimą;

**Prisijungusio vartotojo funkcijos**
1. Atsijungti nuo sistemos
2. Įvertinti pasirinktą žaidimą;
3. Ištrinti parašytą įvertinimą;
4. Peržiūrėti visus savo parašytus įvertinimus;
5. Matyti žaidimo įvertinimus su komentarais;

**Administratoriaus funkcijos:**
1. Pridėti naują žaidimo kūrėją/kompaniją;
2. Redaguoti žaidimo kūrėjo/kompanijos informaciją;
3. Trinti žaidimo kūrėją/kompaniją;
4. Trinti įvertinimus
5. Pridėti naują žaidimą;
6. Trinti naują žaidimą;
7. Redaguoti pridėtą žaidimą;

## 2. Projekto pasirinktos technologijos
**Front-End:** React JS + TypeScript.
**Back-End:** Node.js + TypeScrip.

## 3. Sistemos architectūra

![image](https://user-images.githubusercontent.com/53708719/193450817-b6216e6c-a47e-4557-99e9-972f80f153fd.png)



