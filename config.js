const config = {
  title:
    "Dobopack - dystrybutor dodatków barwiących i smakowo-zapachowych do żywności",
  description:
    "Dobopack Trading - oferujemy dodatki do żywności dla producentów: barwniki spożywcze naturalne i syntetyczne, aromaty, oleorezyny, olejki eteryczne, bazy do napojów. +48 22 633 96 27",
};

const baseUrl = {
  development: "http://localhost:3000",
  production: "https://www.kolory.com",
}[process.env.NODE_ENV];

config.baseUrl = baseUrl;

export default config;
