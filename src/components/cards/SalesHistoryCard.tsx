
interface SalesHistoryProps {
    items: { product: string; agent: string ; id:string; date: string}[];
  }


const SalesHistoryCard: React.FC<SalesHistoryProps> = ({ items }) => {
  return (
    <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-md mx-6 my-6">
      <h2 className="text-lg font-semibold text-white mb-4">Sales History</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-[#464646] p-4 rounded-md flex justify-between">

            <div className="min-w-[200px]">
                <h3 className="text-white font-semibold">{item.product}</h3>
                <p className="text-white text-sm">Agent: {item.agent}</p>
            </div>

            <div>
                <h3 className="text-white font-semibold">id: {item.id}</h3>
            </div>

            <div>
                <h3 className="text-white font-semibold">{item.date}</h3>
                <button className="text-irchad-orange text-sm">view invoice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistoryCard;