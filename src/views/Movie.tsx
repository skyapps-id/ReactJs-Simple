import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies, updateMovie } from '../store/movie/movie-actions';
import { Button, Row, Col, Modal, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { MovieModel, MoviesModel } from '../models/redux-models';
import BuildTable from '../components/Table';

const { Text } = Typography;

interface Columns {
  title: string;
  key: string;
  dataIndex?: string;
  editable?: boolean;
  width?: number | string;
  render?: any;
}
interface DataTypeState {
  key: number;
  title: string;
  views: number;
  genre: string;
  descriptions: string;
}

interface IRootState {
  movie: MoviesModel;
}

interface DispatchProps {
  fetchMovies: () => void;
  updateMovie: (id: string, payload: MovieModel) => void;
}

const mapStateToProps = (state: IRootState) => state;

const mapDispatchToProps = {
  fetchMovies,
  updateMovie
};

type IProps = IRootState & DispatchProps;

type IState = {
  data: DataTypeState[];
  isModalVisible: boolean;
  selectIndex: number | null;
  isFilterVisible: boolean;
};
class Movie extends Component<IProps, IState> {
  columns: Columns[] = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'no',
      width: 60,
      render: (_: any, record: DataTypeState) => <>{Number(record.key) + 1}</>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true
    },
    {
      title: 'views',
      dataIndex: 'views',
      key: 'views',
      width: 120,
      editable: true
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      width: 150,
      editable: true
    },
    {
      title: 'Description',
      dataIndex: 'descriptions',
      key: 'descriptions',
      editable: true,
      render: (_: any, record: DataTypeState) => (
        <Row>
          <Col span={23}>
            <Text ellipsis>{record.descriptions}</Text>
          </Col>
          <Col span={1}>
            <InfoCircleOutlined onClick={() => this.showModal(record.key)} />
          </Col>
        </Row>
      )
    }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      selectIndex: null,
      isFilterVisible: false
    };
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <Row>
          <Button type="primary" onClick={() => this.handleFilter(!this.state.isFilterVisible)}>
            Filter
          </Button>
        </Row>
        <Row>
          <BuildTable
            columns={this.columns}
            data={this.state.data.map((data) => ({
              key: data.key.toString(),
              title: data.title,
              views: data.views,
              genre: data.genre,
              descriptions: data.descriptions
            }))}
            isFilterVisible={this.state.isFilterVisible}
            updateData={this.updateData}
          />
        </Row>
        <Modal
          title="Description"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.state.selectIndex !== null && (
            <p>{this.state.data[this.state.selectIndex].descriptions}</p>
          )}
        </Modal>
      </>
    );
  }
  getData = async () => {
    await this.props.fetchMovies();
    this.setState({
      data: this.props.movie.all_movie.map((data, index) => ({ key: index, ...data }))
    });
  };
  updateData = async (id: string, data: MovieModel) => {
    await this.props.updateMovie(id, {
      title: data.title,
      views: data.views,
      genre: data.genre,
      descriptions: data.descriptions
    });
    await this.getData();
    this.setState({ isFilterVisible: false });
  };
  showModal = (index: number) => {
    this.setState({ isModalVisible: true, selectIndex: index });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false, selectIndex: null });
  };
  handleFilter = (isFilterVisible: boolean) => {
    this.setState({ isFilterVisible });
    if (!isFilterVisible) {
      this.setState({
        data: this.props.movie.all_movie.map((data, index) => ({ key: index, ...data }))
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
