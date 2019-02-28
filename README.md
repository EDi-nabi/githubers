# Githubers

Zadanie testowe. O tyle nieprzyjemne, że w zasadzie niewykonalne. :)
Zrobiłem co mogłem, ale daleki jestem od zadowolenia. Za to mogę powiedzieć, że rozwiązanie trzyma poziom zadania. ;)

Zadanie polegało na "zamianie GitHuba w Facebooka". Czyli wyświetlenie sortowanej listy kontrybutorów wszystkich repozytoriów Angulara.
Niestety Angular zablokował dostęp do swojego API GraphQL'owego, więc musiałem korzystać z RESTowego. A ono zupełnie nie nadaje się do takiej zabawy.

Angular ma 188 repozytoriów. W nich około 2900 kontrybutorów. RESTowe API GitHuba wymusza paginację wyników, pozwalając pobrać maksymalnie 100 rekordów na stronę.
Żeby pobrać dane kontrybutorów trzeba przejść następującą ścieżkę zapytań:

1. Pobrać profil Angulara. W nim podana jest ilość repozytoriów i adres listy. Pierwszy request.
2. Pobrać listę repozytoriów. Dwie strony, kolejne dwa requesty.
3. Z każdego repozytorium pobrać ilość kontrybutorów. 188 requestów. Dane repozytorium nie zawierają informacji o kontrybutorach. Żeby ją wyciągnąć trzeba zapytać o listę kontrybutorów z paginacją ustawioną na 1 kontrybutor na stronę. Wtedy w nagłównu odpowiedzi zwracany jest link do ostatniej strony, a z niego da się wyciągnąć ilość "stron" czyli kontrybutorów.
4. Mając ilość kontrybutorów można obliczyć na ile stron podzielona będzie lista kontrybutorów w każdym repozytorium. Niektóre repozytoria mieszczą się na jednej stronie, inne mają ich pięć. Leci przynajmniej 400 kolejnych zapytań.
5. Pobrać wszystkich kontrybutorów z każdego repozytorium. Kontrybutorów jest co prawda ok. 2900, ale zapytań leci dużo więcej, bo wielu z nich udziela się przy wielu repozytoriach. A trzeba pobrać dane o ilości kontrybucji każdego kontrybutora żeby móc ich potem posortować po sumie tych kontrybucji. Tak że do serwera leci przynajmniej 3000 - 3500 zapytań, a nie zdziwiłbym się, gdyby było ich jeszcze więcej.
6. Z każdego kontrybutora trzeba pobrać pełny profil użytkownika, bo w nim znajdują się z kolei informacje o gistach, followersach i innych repozytoriach, po których też w zadaniu należy sortować. Tutaj można już skromnie udeżyć do serwera tylko 2900 razy.

Podsumowując, aby wyświetlić pierwszą stronę takiej apki należy wysłać do serwera z grubsza licząc 6000 zapytań. Na dodatek wszystko to trzeba trzymać w pamięci, bo trzeba to sortować. A przynajmniej trzeba byłoby, gdyby dało się to pobrać. Na szczęście mój poczciwy MacPro z kilogramem pamięci wywala się po kilku minutach do tego stopnia, że nawet kulka już mu się nie kręci, a GitHub blokuje API Key.

I teraz pojawia się pytanie. Czy to ja tak bardzo nie znam się na robocie, że nie wiem jak wysłać 6000 zapytań do serwera żeby wyświetlić jedną stronę? Czy to ktoś po Waszej stronie nie zauważył, że GitHub daje możliwość blokowania API, team Angulara z tej możliwości skorzystał (wszyscy inni, których sprawdzałem też), a przez co zadanie straciło sens?
Bo ja już się w połowie roboty zastanawiałem, czy nie napisać sobie proxy, które by mi tego githuba pobrało, skeszowało i podawało już posortowanego i podzielonego na strony. No bo chyba nie musimy sobie tłumaczyć, że tak to się powinno robić. ;) Tylko że startuję do Was na frontenda a nie na fullstacka i moglibyście mnie odrzucić za słabo wykonane zadanie. :D

Zmarnowałem kilka dni kombinując jak to ogarnąć, ale w końcu zarzuciłem temat i zostawiłem w effectach potworka, który ciągnie jak leci. Ograniczyłem jedynie w configu ilość repozytoriów, z których pobieram kontrybutorów, żeby móc przynajmniej na szybko obsłużyć wyświetlanie danych. No i właśnie - reszta jest "na szybko". Brakuje kontroli błędów, preloaderów, testów przede wszystkim. Ledwo CSSy na sam koniec dopisałem żeby to jakoś wyglądało, bo byście mnie skreślili z miejsca.
A tak to jednak mam nadzieję, że choćby w rekompensacie za wyrządzone szkody moralne, przepuścicie mnie do "rozmowy z technicznym". Bo Julię macie świetną, ale z nią o kolorowych literach nie pogadam.

Wysyłam zadanie jak jest, bo za 10 minut północ, a obiecałem dostarczyć na piątek.

Pozdrawiam.
ED

P.S.
Na stronie repozytorium nie dawałem już możliwości klikania z kontrybutorów. Cała ta zabawa z pobieraniem do sortowania sprawiła, że architektura tej apki jest bez sensu i musiałbym ją trochę przemodelować żeby się wszystko zazębiło. Może jeszcze jutro do tego przysiądę, gdybyście nie sprawdzali przed weekendem. W każdym razie w biefie nic nie było, że ma się w nich dać klikać. Znaleźć ich tam można jak najbardziej. ;)

P.S.2
Ciekawe czy komukolwiek będzie się chciało to czytać.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests...
Na testy zabrakło czasu.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests...
Na te też.
