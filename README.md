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

# Wireframe ir galutinio produkto palyginimai
## Pagrindinis puslapis
![Screenshot_1](https://user-images.githubusercontent.com/53708719/207832894-87badf51-7de2-48f1-b3d0-4c055c170e0d.png) 
![image](https://user-images.githubusercontent.com/53708719/207832990-2dbdb52d-5ddc-48f0-9477-8b7a15a26b09.png)
## Kompanijų sąrašas
![Screenshot_2](https://user-images.githubusercontent.com/53708719/207834289-0e238571-755d-4de1-a36d-f21a1ff8c05f.png)
![image](https://user-images.githubusercontent.com/53708719/207834407-1190eb71-d80b-4ef6-900f-c26275f0b04c.png)
## Žaidimimų sąrašas
![Screenshot_3](https://user-images.githubusercontent.com/53708719/207834543-5f9b14ef-791c-4338-b212-14e8bfa73339.png)
![image](https://user-images.githubusercontent.com/53708719/207834637-fac502f7-97b8-479a-9208-6987b8ee34ed.png)
## Žaidimo informacijos langas
![Screenshot_4](https://user-images.githubusercontent.com/53708719/207836313-d0e173b6-4159-4790-8235-2aedaf4e4dea.png)
![image](https://user-images.githubusercontent.com/53708719/207835601-4367ecd3-fcaf-4cd3-b974-5976c845ec39.png)
##  Prisijungimo langas
![Screenshot_5](https://user-images.githubusercontent.com/53708719/207835723-9e44db2f-828d-44bb-a0cf-44714e8fe876.png)
![image](https://user-images.githubusercontent.com/53708719/207835796-0d1ed30e-3a05-4026-b6c6-d64350b645b5.png)

## Įvertinimo rašymo langas
![image](https://user-images.githubusercontent.com/53708719/207835932-18fb4e9c-4509-469a-8507-bc7e54fa78ed.png)
![image](https://user-images.githubusercontent.com/53708719/207836084-a085c7a6-c958-43f5-9dd5-4574409d8c64.png)

# API Specifikacijos
## GET companies/list

**RESOURCES URL**
https://videogamerating.azurewebsites.net/companies/

**RESPONSES CODES**

| Responses Codes | Message |
| ------------- | ------------- |
| 200 | Data was fetched  |
| 500  | Internal Error  |
| 400  | Bad Request  

## EXAMPLE REQUEST

** SEND GET REQUEST:** https://videogamerating.azurewebsites.net/companies/

### Result

```javascript
{
    "companies": [
        {
            "id": 11,
            "name": "RockStart",
            "creationDate": "1996-01-15T00:00:00.000Z",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/2226px-Rockstar_Games_Logo.svg.png"
        }
    ]
}
```
## GET companies/single

**RESOURCES URL**
GET https://videogamerating.azurewebsites.net/companies/11/

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 200 | Data was fetched  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |

## EXAMPLE REQUEST

**SEND GET REQUEST** https://videogamerating.azurewebsites.net/companies/11/

### Result

```javascript
{
    "data": {
        "id": 11,
        "name": "RockStart",
        "creationDate": "1996-01-15T00:00:00.000Z",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/2226px-Rockstar_Games_Logo.svg.png"
    }
}
```

## DELETE companies/single

**RESOURCES URL**
DELETE https://videogamerating.azurewebsites.net/companies/11/

**RESPONSES CODES**

| Responses Code  | Message |
| ------------- | ------------- |
| 204 | No Content  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 404  | Not Found |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND DELETE REQUEST** https://videogamerating.azurewebsites.net/companies/11/

### Result
```javascript
{
   
}
```

## POST companies/single

**RESOURCES URL**
POST https://videogamerating.azurewebsites.net/companies/

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 201 | Created  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND POST REQUEST** https://videogamerating.azurewebsites.net/companies/

```javascript
{
    "name": "Test Compony",
    "creationDate": "2022-09-07",
    "image": "image link"
}
```
### Result
```javascript
{
   id:12
}
```

## PUT companies/single

**RESOURCES URL**
PUT https://videogamerating.azurewebsites.net/companies/11

**RESPONSES CODES**


| Responses Code  | Message |
| ------------- | ------------- |
| 204 | No Content  |
| 500  | Internal Error  |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden |

## EXAMPLE REQUEST

**SEND PUT REQUEST** https://videogamerating.azurewebsites.net/companies/11

```javascript
{
    "name": "Test Compony",
    "creationDate": "2022-09-07",
    "image": "image link"
}
```
### Result
```javascript
{
  
}
```
