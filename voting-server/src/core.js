import {List, Map} from 'immutable';
export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    const list = List(entries);
    return state.set('entries', list)
            .set('initialEntries', list);
}

export function next(state, round = state.getIn(['vote', 'round'], 0)) {
    const entries = state.get('entries')
            .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({
                round: round + 1,
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
}

}
export function restart(state) {
    const round = state.getIn(['vote', 'round'], 0);
    return next(
            state.set('entries', state.get('initialEntries'))
            .remove('vote')
            .remove('winner'),
            round
            );
}
export function vote(state, entry) {
    if (state.get('pair').includes(entry)) {
        return state.updateIn(
        ['tally', entry],
                0,
                tally => tally + 1
        );
    } else {
        return state;
    }
}
function getWinners(vote) {
    if (!vote)
        return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes)
        return [a];
    else if (aVotes < bVotes)
        return [b];
    else
        return [a, b];
}
