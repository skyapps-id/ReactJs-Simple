import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../store/movie/movie-actions';
import { Space, Table, Button, Row, Col, Modal, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { MoviesModel } from '../models/redux-models';

const { Text } = Typography;
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
  isModalVisible: boolean;
  selectIndex: number | null;
};
class Movie extends Component<IProps, IState> {
  columns: ColumnsType<DataTypeState> = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'no',
      width: 60
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      width: 100
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      width: 150
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      render: (_, { key, desc }) => (
        <Row>
          <Col span={23}>
            <Text ellipsis>{desc}</Text>
          </Col>
          <Col span={1}>
            <InfoCircleOutlined onClick={() => this.showModal(key)} />
          </Col>
        </Row>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: () => (
        <Space size="middle">
          <a href="/#">Edit</a>
        </Space>
      )
    }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = { input: '', data: [], isModalVisible: false, selectIndex: null };
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
          <Table columns={this.columns} dataSource={this.state.data} scroll={{ y: 440 }} />
        </Row>
        <Modal
          title="Description"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.state.selectIndex !== null && <p>{this.state.data[this.state.selectIndex].desc}</p>}
        </Modal>
      </>
    );
  }
  getData = async () => {
    await this.props.fetchMovies();
    this.setState({
      data: this.props.movie.all_movie.map((list, index) => ({
        key: index + 1,
        title: list.title,
        view: list.views,
        genre: list.genre,
        desc: list.descriptions
      }))
    });
  };
  handleSearch = (search: string) => {
    console.log(this.state.isModalVisible);
  };
  showModal = (index: number) => {
    this.setState({ isModalVisible: true, selectIndex: index - 1 });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false, selectIndex: null });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
