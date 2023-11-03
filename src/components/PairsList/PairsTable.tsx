import React from "react";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as BinocularIcon } from "../../assets/icons/binocular.svg";
import { ReactComponent as StartIcon } from "../../assets/icons/star-outline.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart.svg";
import { ReactComponent as SpeedIcon } from "../../assets/icons/speed.svg";
import { ReactComponent as StarInsertedIcon } from "../../assets/icons/star-inserted.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";
import { ReactComponent as MoneyBillIcon } from "../../assets/icons/money-bill.svg";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import ProfileImg from "../../assets/images/LogoImg.png";
import { useNavigate } from "react-router-dom";

const PairsTable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
          <th>
              <span>
Transaction              </span>
            </th>            <th>
              <span>
Timestamp              </span>
            </th>
           
            
            <th>
              <span>
Token              </span>
            </th>          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr
              key={i.toString()}
            >
              <td>0x5DF8335Ea6d77a3534A84E4D387BB0fAbCcC6883</td>
              <td>2 mins</td>
              <td>
                <div className="flex row-header">
                  <img src={ProfileImg} alt="" />
                  <div className="flex-column">
                    <h4 style={{marginTop:'3px'}}>
wNexus                    </h4>
                   
                  </div>
                </div>
              </td>
              
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PairsTable;
