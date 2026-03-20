import './styles.css'
import editIcon from '../../assets/editar.svg';
import removeIcon from '../../assets/remover.svg';
import SearchBar from '../SearchBar';
import ButtonInverse from '../ButtonInverse';




export interface ColumnConfig<T> {
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onDetails?: (item: T) => void;
    searchPlaceholder: string;
    onSearch?: (text: string) => void;
    onButtonClick?: () => void;
    buttonText?: string;
    onLoadMore: () => void;
    hasMore?: boolean;
}

export function DataTable<T extends { id: number | string }>({
    data,
    columns,
    onEdit,
    onDelete,
    onDetails,
    searchPlaceholder,
    onSearch,
    onButtonClick,
    buttonText,
    onLoadMore,
    hasMore
}: DataTableProps<T>) {

    return (
        <>
            <div className="psi-new-btn">
                {onButtonClick && (
                    <ButtonInverse click={onButtonClick}
                        text={buttonText || "Novo"}
                    />

                )}
            </div>

            {
                data.length > 0 ? (
                    <div className="psi-table-wrapper">
                        <div className="psi-table-header-actions">

                            {onSearch && (
                                <SearchBar
                                    placeholder={searchPlaceholder}
                                    onSearch={onSearch}
                                />
                            )}
                        </div>
                        <table className="table mb20 mt20">
                            <thead>
                                <tr>
                                    {columns.map((col, index) => (
                                        <th key={index}>{col.header}</th>
                                    ))}
                                    {(onEdit || onDelete) && <th></th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        {columns.map((col, index) => (
                                            <td
                                                key={index}
                                                className={onDetails ? 'psi-cursor-pointer' : ''}
                                                onClick={() => onDetails?.(item)}
                                            >
                                                {col.render(item)}
                                            </td>
                                        ))}


                                        {(onEdit || onDelete) && (
                                            <td>
                                                <div className='table-container-icons'>
                                                    {onEdit && (
                                                        <img
                                                            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                                                            className="table-icon"
                                                            src={editIcon}
                                                            alt="Editar"
                                                        />
                                                    )}
                                                    {onDelete && (
                                                        <img
                                                            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                                                            className="table-icon"
                                                            src={removeIcon}
                                                            alt="Remover"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {
                            !hasMore &&
                            <ButtonInverse click={onLoadMore} text='Carregar mais' />
                        }
                    </div>
                ) :
                    (
                        <div className='psi-empty-result'>
                            <h2>Nenhum resultado encontrado</h2>
                        </div>
                    )

            }



        </>
    );
}
