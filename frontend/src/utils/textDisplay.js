export const displayWeekday = (en_day) => {
  if (en_day === 'Monday') return '月曜';
  else if (en_day === 'Tuesday') return '火曜';
  else if (en_day === 'Wednesday') return '水曜';
  else if (en_day === 'Thursday') return '木曜';
  else if (en_day === 'Friday') return '金曜';
  else if (en_day === 'Saturday') return '土曜';
  else if (en_day === 'Sunday') return '日曜';
}

// export const backendUrl = 'http://localhost:3001/';
export const backendUrl = 'http://localhost:3001/api/v1/files/';
// export const backendUrl = '/api/v1/files/';

export const genderOptions = [
  { name: '男性', value: 1 },
  { name: '女性', value: 2 },
  { name: 'その他', value: 3 }
];

export const evtTypeOptions = [
  { name: '通常', value: 1 },
  { name: 'ゲリラ', value: 2 }
];