import { useNavigate } from 'react-router-dom';

export function useEntityActions(states: any) {
    const navigate = useNavigate();

   
    const {
        setEntity,
        queryParams,
        setQueryParams,
        dialogInfoData,
        setDialogInfoData,
        dialogConfirmationData,
        setDialogConfirmationData
    } = states;

    const handleSearch = (searchText: string) => {
        setEntity([]);
        setQueryParams({ ...queryParams, page: 1, name: searchText });
    };

    const handleNextPage = () => {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    };

    const handleOpenDelete = (id: number) => {
        setDialogConfirmationData({ ...dialogConfirmationData, id, visible: true });
    };

    const handleDialogClose = () => {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    };

    const handleConfirmDelete = (answer: boolean, entityId: number, entityService: any) => {
        if (answer) {
            entityService.deleteById(entityId)
                .then(() => {
                    setEntity([]);
                    setQueryParams({ ...queryParams, page: 1 });
                })
                .catch((error: any) => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response?.data?.error || "Erro ao excluir"
                    });
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    };

  
    return {
        handleSearch,
        handleNextPage,
        handleOpenDelete,
        handleDialogClose,
        handleConfirmDelete,
        navigate
    };
}