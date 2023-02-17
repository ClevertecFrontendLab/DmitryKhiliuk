import {Agreement} from '../../../components/agreement';
import {Rules} from '../../../components/rules';

type TermsType = {
    contentView: 'rules' | 'agreement'
}

export const Terms = ({contentView}: TermsType) => (
        <div>
            {contentView === 'rules' ? <Rules/> : <Agreement/>}
        </div>
    );

