import { render } from '@testing-library/react';
import AllCollectionItem from '../../components/AllCollectionItem';

it('Rendering correctly', () => {
  const { asFragment } = render(
        <AllCollectionItem
            title={'Test'}
            userId={'test1238484'}
            username={'testuser'}
            numberGoals={3}
            isLiked={true}
            onLikeToggle={() => handleLike(848485185)}
            numberLikes={5}
            goals={[{label:"Test2", id:"goal84515"}, {label:"Test3", id:"goal484152"}]}
        />
    )
  expect(asFragment()).toMatchSnapshot(); 
});

