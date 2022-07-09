import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../store/movie/movie-actions';
import { Space, Table, Button, Row } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { MoviesModel } from '../models/redux-models';

interface DataTypeState {
  key: number;
  title: string;
  view: number;
  desc: string;
  genre: string;
}

interface IRootState {
  movie: MoviesModel;
}

interface DispatchProps {
  fetchMovies: () => void;
}

const mapStateToProps = (state: IRootState) => state;

const mapDispatchToProps = {
  fetchMovies
};

type IProps = IRootState & DispatchProps;

type IState = {
  input: string;
  data: DataTypeState[];
};
class Movie extends Component<IProps, IState> {
  columns: ColumnsType<DataTypeState> = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'no'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view'
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre'
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a href="/#">Edit</a>
        </Space>
      )
    }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = { input: '', data: [] };
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <Button type="primary" onClick={() => this.getData()}>
          Filter
        </Button>
        <Row>
          <Table columns={this.columns} dataSource={this.state.data} scroll={{ y: 420 }} />
        </Row>
      </>
    );
  }
  getData = async () => {
    await this.props.fetchMovies();
    this.setState({
      data: this.props.movie.all_movie.map((list, index) => ({
        key: index,
        title: list.title,
        view: list.views,
        genre: list.genre,
        desc: list.descriptions
      }))
    });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
