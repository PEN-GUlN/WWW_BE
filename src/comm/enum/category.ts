export enum Category {
  DEVELOPMENT = 'DEVELOPMENT',
  ELECTRICAL_ELECTRONIC = 'ELECTRICAL_ELECTRONIC',
  MANUFACTURING = 'MANUFACTURING',
  CHEMICAL = 'CHEMICAL',
  TEXTILE_APPAREL = 'TEXTILE_APPAREL',
  MECHANICAL_METAL = 'MECHANICAL_METAL',
  CONSTRUCTION_CIVIL = 'CONSTRUCTION_CIVIL',
  OFFICE_SERVICE = 'OFFICE_SERVICE',
  MEDICAL = 'MEDICAL',
  ETC = 'ETC',
}

export const categoryMap: { [key: string]: Category } = {
  '01': Category.DEVELOPMENT,
  '02': Category.ELECTRICAL_ELECTRONIC,
  '03': Category.MANUFACTURING,
  '04': Category.CHEMICAL,
  '05': Category.TEXTILE_APPAREL,
  '06': Category.MECHANICAL_METAL,
  '07': Category.CONSTRUCTION_CIVIL,
  '08': Category.OFFICE_SERVICE,
  '09': Category.MEDICAL,
  '10': Category.ETC,
};

export const categoryNameInKorean: { [key in Category]: string } = {
  [Category.DEVELOPMENT]: '전산,컴퓨터',
  [Category.ELECTRICAL_ELECTRONIC]: '전기/전자',
  [Category.MANUFACTURING]: '생산/제조',
  [Category.CHEMICAL]: '화학',
  [Category.TEXTILE_APPAREL]: '섬유/의류',
  [Category.MECHANICAL_METAL]: '기계/금속',
  [Category.CONSTRUCTION_CIVIL]: '건설/토목',
  [Category.OFFICE_SERVICE]: '사무/서비스',
  [Category.MEDICAL]: '의료',
  [Category.ETC]: '기타',
};
