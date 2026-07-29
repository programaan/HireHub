import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
    page,
    totalPages,
    setPage,
}) {

    const pages = [];

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {
        pages.push(i);
    }

    return (

        <div className="pagination">

            <button className="page-arrow" disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                <ChevronLeft size={18} />

            </button>

            {
                pages.map((num)=>(

                    <button key={num}
                        className={`page-number ${
                            page===num ? "active" : ""
                        }`}
                        onClick={() => setPage(num)}
                    >
                        {num}
                    </button>
                ))
            }

            <button className="page-arrow" disabled={page===totalPages}
                onClick={() => setPage(page+1)}
            >
                <ChevronRight size={18} />
            </button>

        </div>

    );

}

export default Pagination;