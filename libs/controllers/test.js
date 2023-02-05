const { Shop } = require("./dataProductsHandler");
const { Atlas } = require("./dataUserHandler");
// const images = require('../../database/assets/')

(async () => {
  const dataForm = {
    nameProducts: "Andrographis Centella",
    prices: 85000,
    categorys: "Herbal",
    imagePath: "../../database/assets/andrographis-centella.png",
    description:
      "KEGUNAAN\nSecara tradisional digunakan untuk melindungi hati, meningkatkan sistem kekebalan tubuh, menurunkan panas, menghilangkan rasa nyeri dan antibiotik alami.\n\nKOMPOSISI\nSambiloto (Andrographis paniculata)\nAlang-alang (Imperata cylindrica)\nPegagan (Centella Asiatic)\n\nKONTRA INDIKASI\nIbu hamil disarankan konsultasi dengan dokter bila mengkonsumsi herbal ini.\n\nATURAN PAKAI\n3 x 2 kapsul sebelum makan",
  };
  // let { insertCallback, productForm } = await Shop.appendProduct('Testing', dataForm)
  // console.log(insertCallback, productForm);

  // let allProducts = await Shop.getAllProduct();

  // let result = await Shop.getProductByID('4C83F')

  // let rowsProducts = [];

  // let dataArray = allProducts.map(
  //   (val) => ({
  //     title: val.data.name,
  //     rowId: `getproduct ${val.id}`,
  //     description: `Harga Rp.${val.data.price}`,
  //   }),
  //   {}
  // );
  // rowsProducts.push(...dataArray);
  // let dataArr = [
  //   {
  //     title: 'some title',
  //     rows: rowsProducts
  //   }
  // ]

    // console.log(dataArr[0]);

  // console.log(allProducts);

  let res = await Shop.getProductByID('8FCBD')
  console.log(res)
})();

let expectedOutputData = [
  {
    title: null,
    rowId: "getproduct 8FCBD",
    description: 90000,
  },
  {
    title: "Magafit",
    rowId: "getproduct 4C83F",
    description: 90000,
  },
  {
    title: "Andrographis Centella",
    rowId: "getproduct 60088",
    description: 85000,
  },
];
