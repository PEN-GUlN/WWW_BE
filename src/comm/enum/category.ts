export enum Category {
  DEVELOPMENT = '개발',
  ELECTRICAL_ELECTRONIC = '전기/전자',
  MANUFACTURING = '생산/제조',
  CONSTRUCTION_CIVIL = '건설/토목',
  OFFICE_SERVICE = '사무/서비스',
  MEDICAL = '의료',
  ETC = '기타',
}

export const categoryMap: { [key: string]: Category } = {
  '01': Category.DEVELOPMENT,
  '02': Category.ELECTRICAL_ELECTRONIC,
  '03': Category.MANUFACTURING,
  '04': Category.CONSTRUCTION_CIVIL,
  '05': Category.OFFICE_SERVICE,
  '09': Category.MEDICAL,
  '99': Category.ETC,
};
