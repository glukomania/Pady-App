export const rules = {
  1: {
    question: "1. pád - Kdo? Co?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", "-ý", "-í"],
        tableData: [
          ["Ma", "ten", "muj", "dobrý", "kvaliní"],
          ["Mi", "ten", "muj", "dobrý", "kvalitní"],
          ["F", "ta", "moje/má", "dobrá", "kvalitní"],
          ["N", "to", "moje/mé", "dobré", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "student", "muž, soudce", "kolega"],
          ["Mi", "banán", "čaj", "--"],
          ["F", "káva", "restaurace, kancelař", "místnost"],
          ["N", "auto", "moře", "kuře/nádraží"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", "-ý", "-í"],
        tableData: [
          ["Ma", "ti", "moji/mí", "dobří", "kvalitní"],
          ["Mo", "ty", "moje/mé ", "dobré", "kvalitní"],
          ["F", "ty", "moje/mé", "dobré", "kvalitní"],
          ["N", "ta", "moje/má", "dobrá", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenti", "muži/-ové, soudci/-ové", "kolegové"],
          ["Mi", "banány", "čaje", "--"],
          ["F", "kávy", "kanceláře, restaurace", "místnosti"],
          ["N", "auta", "moře", "kuřata, nádraží"],
        ],
      },
    },
  },
  2: {
    question: "2. pád - Koho? Čeho?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "toho", "muj", "dobrého", "kvaliního"],
          ["Mi", "toho", "muj", "dobrého", "kvalitního"],
          ["F", "té", "mojí/mé", "dobré", "kvalitní"],
          ["N", "toho", "mého", "dobrého", "kvalitního"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenta", "muže, soudce", "kolegy"],
          ["Mi", "banánu/lesa", "čaje", "--"],
          ["F", "kávy", "restaurace, kanceláře", "místnosti"],
          ["N", "auta", "moře", "kuřete, nádraží"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "těch", "mých", "dobrých", "kvalitních"],
          ["Mi", "těch", "mých", "dobrých", "kvalitních"],
          ["F", "těch", "mých", "dobrých", "kvalitních"],
          ["N", "těch", "mých", "dobrých", "kvalitních"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentů", "mužů, soudců", "kolegů"],
          ["Mi", "banánů", "čajů", "--"],
          ["F", "káv", "kanceláří, restaurací, ulic", "místností"],
          ["N", "aut", "moří, schodišť", "kuřat, nádraží"],
        ],
      },
    },
  },
  3: {
    question: "3. pád - Komu? Čemu?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "tomu", "mému", "dobrému", "kvalitnímu"],
          ["Mi", "tomu", "mému", "dobrému", "kvalitnímu"],
          ["F", "té", "mojí/mé", "dobré", "kvalitní"],
          ["N", "tomu", "mému", "dobrému", "kvalitnímu"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentu/-ovi", "muži/-ovi, soudci/-ovi", "kolegovi"],
          ["Mi", "banánu", "čaji", "--"],
          ["F", "kávě", "kanceláři, restauraci", "místnosti"],
          ["N", "autu", "moři", "kuřeti, nádraží"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "těm", "mým", "dobrým", "kvalitním"],
          ["Mi", "těm", "mým", "dobrým", "kvalitním"],
          ["F", "těm", "mým", "dobrým", "kvalitním"],
          ["N", "těm", "mým", "dobrým", "kvalitním"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentům", "mužům, soudcům", "kolegům"],
          ["Mi", "banánům", "čajům", "--"],
          ["F", "kávám", "kancelářím, restauracím", "místnostem"],
          ["N", "autům", "mořím", "kuřatům, nádražím"],
        ],
      },
    },
  },
  4: {
    question: "4. pád - koho? Co?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "toho", "mého ", "dobrého", "kvalitního"],
          ["Mi", "ten", "můj", "dobrý", "kvalitní"],
          ["F", "tu", "moji/mou", "dobrou", "kvalitní"],
          ["N", "to", "moje/mé", "dobré", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenta", "muže, soudce", "kolegu"],
          ["Mi", "banán", "čaj", "--"],
          ["F", "kávu", "kancelář, restauraci", "místnost"],
          ["N", "auto", "moře", "kuře, nádraží"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "ty", "moje/mé", "dobré", "kvalitní"],
          ["Mi", "ty", "moje/mé", "dobré", "kvalitní"],
          ["F", "ty", "moje/mé", "dobré", "kvalitní"],
          ["N", "ta", "moje/mé", "dobré", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenty", "muže, soudce", "kolegy"],
          ["Mi", "banány", "čaje", "--"],
          ["F", "kávy", "kanceláře, restaurace", "místnosti"],
          ["N", "auta", "moře", "kuřata, nádraží"],
        ],
      },
    },
  },
  5: {
    question: "5. pád",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "--", "můj", "dobrý", "kvalitní"],
          ["F", "--", "moje/má", "dobrá", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studente! Marku!", "muži! soudce!", "kolego!"],
          ["F", "studentko!", "kolegyně!", "Carmen!"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "--", "moji/mí", "dobří", "kvalitní"],
          ["F", "--", "moje/má", "dobré", "kvalitní"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenti!", "muži!/-ové!, soudci!/-ové!", "kolegové!"],
          ["F", "studentky!", "kolegyně!", "--"],
        ],
      },
    },
  },
  6: {
    question: "6. pád - Kom? Čem?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "tom", "mém", "dobrém", "kvalitním"],
          ["Mi", "tom", "mém", "dobrém", "kvalitním"],
          ["F", "té", "mojí/mé", "dobré", "kvalitní"],
          ["N", "tom", "mém", "dobrém", "kvalitním"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentu/-ovi", "muži/-ovi, soudci/-ovi", "kolegovi"],
          ["Mi", "banánu/-ě", "čaji", "--"],
          ["F", "kávě", "kanceláři, restauraci", "místnosti"],
          ["N", "autu/-ě", "moři", "kuřeti, nádraží"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "těch", "mých", "dobrých", "kvalitních"],
          ["Mi", "těch", "mých", "dobrých", "kvalitních"],
          ["F", "těch", "mých", "dobrých", "kvalitních"],
          ["N", "těch", "mých", "dobrých", "kvalitních"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentech", "mužích, soudcích", "kolezích"],
          ["Mi", "banánech", "čajích", "--"],
          ["F", "kávách", "kancelářích, restauracích", "místnostech"],
          ["N", "autech", "mořích", "kuřatech, nádražích"],
        ],
      },
    },
  },
  7: {
    question: "7. pád - Kým? Čím?",
    singular: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "tím", "mým", "dobrým", "kvalitním"],
          ["Mi", "tím", "mým", "dobrým", "kvalitním"],
          ["F", "tou", "mojí/mou", "dobrou", "kvalitní"],
          ["N", "tím", "mým", "dobrým", "kvalitním"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studentem", "mužem, soudcem", "kolegou"],
          ["Mi", "banánem", "čajem", "--"],
          ["F", "kávou", "kanceláří, restaurací", "místností"],
          ["N", "autem", "mořem", "kuřetem, nádražím"],
        ],
      },
    },
    plural: {
      adjactives: {
        tableHead: ["", "", "", " -ý", "-í"],
        tableData: [
          ["Ma", "těmi", "mými", "dobrými", "kvalitními"],
          ["Mi", "těmi", "mými", "dobrými", "kvalitními"],
          ["F", "těmi", "mými", "dobrými", "kvalitními"],
          ["N", "těmi", "mými", "dobrými", "kvalitními"],
        ],
      },
      subjectives: {
        tableHead: ["", "-konz, -a, -o", "-e/ě, -c, -j, -tel/del, -ev", "-a, -st, -e/ě, -í"],
        tableData: [
          ["Ma", "studenty", "muži, soudci", "kolegy"],
          ["Mi", "banány", "čaji", "--"],
          ["F", "kávami", "kancelářemi, restauracemi", "místnostmi"],
          ["N", "auty", "moři", "kuřaty, nádražími"],
        ],
      },
    },
  },
};
