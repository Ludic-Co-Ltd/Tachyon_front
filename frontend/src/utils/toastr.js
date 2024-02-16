import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Toast(){
    return toastr.error('メンティ情報の更新に失敗しました。');
}