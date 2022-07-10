import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../store/movie/movie-actions';
import { Button, Row, Col, Modal, Typography, Input, Table } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { MoviesModel } from '../models/redux-models';
import BuildTable from '../components/Table';

const { Text } = Typography;

interface Columns {
  title: string;
  key: string;
  dataIndex?: string;
  editable?: boolean;
  width?: number;
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
  columns: Columns[] = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'no',
      width: 60,
      render: (_: any, record: DataTypeState) => <>{record.key + 1}</>
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
          <BuildTable
            columns={this.columns}
            data={this.state.data.map((data) => ({
              key: data.key.toString(),
              title: data.title,
              views: data.views,
              genre: data.genre,
              descriptions: data.descriptions
            }))}
            summary={summary}
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
      this.setState({ searchTitle: '', searchGenre: '' });
    }
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
      .map((data, index) => ({ key: index, ...data }))
      .filter(
        (obj) =>
          obj.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
          obj.genre.toLowerCase().includes(searchGenre.toLowerCase())
      );
    this.setState({ data });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
