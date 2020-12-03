import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { TILE_PAGE } from 'common/const';

interface Props {
  title: ((p) => string) | string;
}

const Title = (props: Props) => {
  const { title = '' } = props;
  const params = useParams();

  return (
    <Helmet>
      <title>
        {typeof title === 'string' || !title
          ? `${TILE_PAGE} | ${title}`
          : `${TILE_PAGE} | ${title(params)}`}
      </title>
    </Helmet>
  );
};

export default Title;
