import Cargo from '../Cargo';
import Pessoa from '../Pessoa';
import Comissao from '../Comissao';
import { IconName, MaybeElement } from '@blueprintjs/core';

export default interface HierarquiaDeComissao {
    parent_position: string,
    cargo: Cargo | undefined;
    hierarquia: {
        id: string,
        position: string
    }
    _componentMemo: {
        getDrawer: { isOpen: boolean, icon: IconName | MaybeElement, view: { id: number, descricao: string } },
        getCardView: Array<number>,
        getCollapseCard: boolean,
        getCollapseComissao: number
    }
}