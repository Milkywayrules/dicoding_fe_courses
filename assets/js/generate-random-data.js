import { getData, setData } from "./modules/crud-data.js";

export const generateRandomData = () => {
  const dbData = getData().data;

  if (!dbData) {
    const props = [];

    for (let idx = 0; idx < 100; idx++) {
      // set max to below 500 data.
      if (props.length >= 500-9) break;
      // push new data to array.
      props.push({
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Haryy Kopter",
          author: "J.K. Rolling",
          yearPublished: "1687",
          isComplete: false,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Book",
          author: "Dio Ilham Djatiadi",
          yearPublished: "2021",
          isComplete: true,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Critical Elephant",
          author: "Someone",
          yearPublished: "2004",
          isComplete: false,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Watermelon Sugar",
          author: "Britishy",
          yearPublished: "2020",
          isComplete: true,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Bumi",
          author: "Eyang",
          yearPublished: "2077",
          isComplete: true,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Just in your dreams",
          author: "Aseprite",
          yearPublished: "1887",
          isComplete: true,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Buku Cetak",
          author: "Tan Malaka",
          yearPublished: "1945",
          isComplete: false,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Time Dilation",
          author: "Hawk Instuff",
          yearPublished: "1459",
          isComplete: true,
        },
        {
          id: +new Date() + Math.random().toLocaleString() * 10000,
          title: "Bumi 2089",
          author: "Jekyll",
          yearPublished: "2089",
          isComplete: false,
        },
      );
    };

    const stringed = JSON.stringify(props);
    const parsedJsonData = JSON.parse(stringed);

    const { isSuccess, isError } = setData(parsedJsonData);

    if (isSuccess) {
      console.log(`---\nRandom dummy data generated to local storage!\nTotal: ${props.length}\n---`);
    } else {
      console.warn(`---\nFailed to generate random data.\n---`);
      console.error(isError);
    }
  }
};
