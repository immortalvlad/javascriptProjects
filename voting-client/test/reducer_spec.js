import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({Trainspotting: 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });
    it('обрабатывает SET_STATE с простой JS-нагрузкой', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('обрабатывает SET_STATE без начального состояния', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });
    it('обрабатывает VOTE с помощью назначения myVote', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        }));
    });
    it('в случае неправильной записи не назначает myVote  для VOTE', () => {
        const state = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Sunshine'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('если пара изменилась, то очищает myVote  в SET_STATE', () => {
        const initialState = fromJS({
            vote: {
                round: 42,
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            myVote: {
                round: 42,
                entry: 'Trainspotting'
            }
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    round: 43,
                    pair: ['Sunshine', 'Trainspotting']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 43,
                pair: ['Sunshine', 'Trainspotting']
            }
        }));
    });
});