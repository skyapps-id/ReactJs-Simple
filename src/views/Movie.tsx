import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../store/movie/movie-actions';
import { Space, Table, Button, Row, Col, Modal, Typography, Input } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
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
  data: DataTypeState[];
  isModalVisible: boolean;
  selectIndex: number | null;
  isFilterVisible: boolean;
  searchTitle: string;
  searchGenre: string;
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
          <EditOutlined />
        </Space>
      )
    }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      selectIndex: null,
      isFilterVisible: false,
      searchTitle: '',
      searchGenre: ''
    };
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const summary = this.state.isFilterVisible
      ? () => (
          <Table.Summary fixed={'top'}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={1} colSpan={1} />
              <Table.Summary.Cell index={2} colSpan={1}>
                <Input
                  name="searchTitle"
                  value={this.state.searchTitle}
                  onChange={this.handleChange}
                  placeholder="Search Title"
                />
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={1} />
              <Table.Summary.Cell index={4} colSpan={1}>
                <Input
                  name="searchGenre"
                  value={this.state.searchGenre}
                  onChange={this.handleChange}
                  placeholder="Search Genre"
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )
      : () => <></>;
    return (
      <>
        <Button type="primary" onClick={() => this.handleFilter(!this.state.isFilterVisible)}>
          Filter
        </Button>
        <Row>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            scroll={{ y: 380 }}
            summary={summary}
          />
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
  showModal = (index: number) => {
    this.setState({ isModalVisible: true, selectIndex: index - 1 });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false, selectIndex: null });
  };
  handleFilter = (isFilterVisible: boolean) => {
    this.setState({ isFilterVisible });
  };
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let searchTitle = this.state.searchTitle;
    let searchGenre = this.state.searchGenre;
    if (e.currentTarget.name === 'searchTitle') {
      this.setState({ searchTitle: e.currentTarget.value });
      searchTitle = e.currentTarget.value;
    }
    if (e.currentTarget.name === 'searchGenre') {
      this.setState({ searchGenre: e.currentTarget.value });
      searchGenre = e.currentTarget.value;
    }
    this.handleSearch(searchTitle, searchGenre);
  };
  handleSearch = (searchTitle: string, searchGenre: string) => {
    const data = this.props.movie.all_movie
      .map((list, index) => ({
        key: index + 1,
        title: list.title,
        view: list.views,
        genre: list.genre,
        desc: list.descriptions
      }))
      .filter(
        (obj) =>
          obj.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
          obj.genre.toLowerCase().includes(searchGenre.toLowerCase())
      );
    this.setState({ data });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
