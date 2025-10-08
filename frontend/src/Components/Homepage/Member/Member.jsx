import React from 'react';
import './member.css';

const members = [
  {
    name: "張蕾霞",
    id: "111AB0062",
  },
  {
    name: "黃鉦荃",
    id: "111AB0060",
  },
  {
    name: "鄧虹屏",
    id: "111AB0061",
  },
];


const Member = () => {
    return(
        <div className="members-container">
            <div className="members-inner">
                <h1 className="members-title">Meet Our Members</h1>
                <div className="members-desc">
                    Created by a passionate team of Indonesian students dedicated to revolutionizing travel with AI and Web3 innovation.
                </div>
                <div className="members-list">
                    {members.map((member) => (
                    <div className="member-card" key={member.id}>
                        <div className="member-avatar" />
                        <div className="member-name">{member.name}</div>
                        <div className="member-id">{member.id}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Member