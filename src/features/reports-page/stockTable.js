import { Typography, Box, IconButton, TextField, Checkbox } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Storefront as StorefrontIcon, LocalShipping as LocalShippingIcon, StoreMallDirectory as StoreMallDirectoryIcon } from '@mui/icons-material';
import FunctionsIcon from '@mui/icons-material/Functions';

// Custom component for rendering the "Stock" column
const StockComponent = ({ stock, inTransit, warehouse }) => {
    const totalStock = warehouse + inTransit + stock;

    return (
        <Box display="flex" alignItems="center">
        <IconButton size="small">
            <LocalShippingIcon />
        </IconButton>
        <Typography variant="body2">{678}</Typography>
        <IconButton size="small">
            <StorefrontIcon />
        </IconButton>
        <Typography variant="body2">{789}</Typography>
        <IconButton size="small">
            <StoreMallDirectoryIcon />
        </IconButton>
        <Typography variant="body2">{789}</Typography>
        <IconButton size="small">
            <FunctionsIcon />
        </IconButton>
        <Typography variant="body2">{totalStock}</Typography>
        </Box>
    );
  };

  // Columns configuration for DataGrid
  
  const columns = [
    { field: 'id', headerName: '', renderCell: () => <IconButton aria-label="Edit"><EditIcon /></IconButton> },
    { field: 'productCode', headerName: 'Product Code', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'stock', headerName: 'Stock', flex: 2, renderCell: (params) => <StockComponent warehouse={params.row.warehouse} stock={params.row.stock} inTransit={params.row.inTransit} /> },
    { field: 'suggestedStockLevel', headerName: 'Suggested Stock Level', flex: 1 },
    { field: 'growth', headerName: 'Growth %', flex: 1 },
    { field: 'suggestedOrderQuantity', headerName: 'Suggested Order Quantity', flex: 1 },
    { field: 'factoryQuantity', headerName: 'Factory Quantity', flex: 1 },
    { field: 'estimatedSalesVolume', headerName: 'Estimated Sales Volume', flex: 1 },
    { field: 'orderQuantity', headerName: 'Order Quantity', flex: 1, renderCell: (params) => <TextField type="number" variant="outlined" size="small" defaultValue="0" /> },
    { field: 'confirmQuantity', headerName: 'Confirm Quantity', flex: 1, renderCell: (params) => <Checkbox color="primary" /> },
  ];

  // Sample data rows
  const rows = [...Array(5)].map((_, index) => ({
    id: index + 1,
    productCode: `Product ${index + 1}`,
    description: `Description of Product ${index + 1}`,
    stock: Math.floor(Math.random() * 20),
    inTransit: Math.floor(Math.random() * 20),
    warehouse: Math.floor(Math.random() * 20),
    suggestedStockLevel: `${index + 1}`,
    growth: `${index + 1}`,
    suggestedOrderQuantity: `${index + 1}`,
    factoryQuantity: `${index + 1}`,
    estimatedSalesVolume: `${index + 1}`,
    orderQuantity: 0,
    confirmQuantity: false,
  }));

  export const StockTable = ({stockItems}) => {

    const headerClassName = {
        wrap: 'wrap-header',
      };

    return (
      
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          

          headerClassName={headerClassName}
        />
        
    )
  }