import React from 'react';
import { Grid, Table as DevExpressTable, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import {
  DataTypeProvider,
  DataTypeProviderProps,
  GridColumnExtension,
  SelectionState,
} from '@devexpress/dx-react-grid';
import cn from 'classnames';
import styles from './Table.module.scss';

export type Column = {
  name: string;
  title?: string;
  getCellValue?: () => void;
} & Omit<GridColumnExtension, 'columnName'>;

type Props = {
  columns: Column[];
  rows: Object[];
  dataTypeProviders?: DataTypeProviderProps[];
  className?: string;
  selectableRowsOnClick?: boolean;
  isSelectionAllowed?: boolean;
  selectedRowIndexes?: number[];
  onSelectionChange?: (indexes: any[]) => void;
  onClickRow?: (row: any) => void;
};


export const Table: React.FC<Props> = ({
  columns,
  rows,
  dataTypeProviders,
  className,
  selectableRowsOnClick= true,
  isSelectionAllowed = false,
  selectedRowIndexes = [],
  onSelectionChange = () => {},
  onClickRow
}) => {
  const columnExtensions: GridColumnExtension[] = columns.map(column => ({
    columnName: column.name,
    ...column,
  }));

  const TableRow = ({ row, ...restProps }: any) => (
    <DevExpressTable.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={() => onClickRow ? onClickRow(row) : null}
      style={{
        cursor: 'pointer',
      }}
    />
  );

  return (
    <div className={cn(styles.container, className)}>
      <Grid rows={rows} columns={columns}>
        {dataTypeProviders?.length
          ? dataTypeProviders.map(item => <DataTypeProvider key={item.for[0]} {...item} />)
          : null}
        {isSelectionAllowed ? (
          <SelectionState selection={selectedRowIndexes} onSelectionChange={onSelectionChange} />
        ) : null}
        <DevExpressTable rowComponent={TableRow} columnExtensions={columnExtensions} />
        <TableHeaderRow />
        {isSelectionAllowed ? <TableSelection /> : null}
      </Grid>
    </div>
  );
};
